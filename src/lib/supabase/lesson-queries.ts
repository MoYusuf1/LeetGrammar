/**
 * Somali Grammar — Pedagogical Content Queries
 *
 * Query helpers for lessons, concepts, exercises, and progress.
 * Uses the project's configured Supabase client.
 */

import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import type {
  GraphNode,
  GraphLesson,
  GraphChunk,
  GraphExercise,
  ExerciseItem,
  ConceptDetail,
  LessonView,
  LessonSection,
  LearnerConceptState,
  MasteryStats,
  UnitProgress,
  ContentEdgeType,
  ConceptEdgeType,
} from "./lesson-types";

function supabase() {
  if (!isSupabaseConfigured) {
    throw new Error("Supabase is not configured");
  }
  return getSupabase();
}

// ─── Lesson Queries ──────────────────────────────────────────────────

export async function getLesson(lessonId: string): Promise<LessonView | null> {
  const { data: lesson } = await supabase()
    .from("graph_lessons")
    .select("*")
    .eq("id", lessonId)
    .single();
  if (!lesson) return null;

  const { data: sections } = await supabase()
    .from("lesson_chunks")
    .select("section_order, section_title, chunk:graph_chunks(*)")
    .eq("lesson_id", lessonId)
    .order("section_order", { ascending: true });

  const { data: exercises } = await supabase()
    .from("graph_exercises")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("difficulty", { ascending: true });

  const sectionChunks = (sections ?? []).map((s: any) => s.chunk?.cid).filter(Boolean);

  const { data: concepts } = sectionChunks.length
    ? await supabase()
        .from("content_edges")
        .select("concept:graph_nodes(*)")
        .in("content_id", sectionChunks)
        .eq("type", "TEACHES")
    : { data: [] };

  const conceptNodes = [
    ...new Map((concepts ?? []).map((c: any) => [c.concept?.id, c.concept])).values(),
  ].filter(Boolean);

  return {
    lesson: lesson as GraphLesson,
    sections: (sections ?? []).map((s: any) => ({
      chunk: s.chunk as GraphChunk,
      order: s.section_order as number,
      title: s.section_title as string | null,
    })) as LessonSection[],
    vocabulary: conceptNodes.filter((n: any) => n?.type === "WORD"),
    exercises: (exercises ?? []) as GraphExercise[],
    teachesConcepts: conceptNodes as GraphNode[],
  };
}

export async function getLessonsByTextbook(textbookId: string): Promise<GraphLesson[]> {
  const { data, error } = await supabase()
    .from("graph_lessons")
    .select("*")
    .eq("textbook_id", textbookId)
    .order("sort_key", { ascending: true });
  if (error) throw error;
  return (data ?? []) as GraphLesson[];
}

export async function getAllLessons(): Promise<GraphLesson[]> {
  const { data, error } = await supabase()
    .from("graph_lessons")
    .select("*")
    .order("sort_key", { ascending: true });
  if (error) throw error;
  return (data ?? []) as GraphLesson[];
}

// ─── Concept Queries ─────────────────────────────────────────────────

export async function getConceptDetail(conceptId: string): Promise<ConceptDetail | null> {
  const { data: concept } = await supabase()
    .from("graph_nodes")
    .select("*")
    .eq("id", conceptId)
    .single();
  if (!concept) return null;

  const { data: content } = await supabase()
    .from("content_edges")
    .select("type, weight, chunk:graph_chunks(*)")
    .eq("concept_id", conceptId)
    .order("weight", { ascending: false });

  const chunks = (content ?? []).map((c: any) => ({
    ...c.chunk,
    edge_type: c.type,
    edge_weight: c.weight,
  })) as (GraphChunk & { edge_type: string; edge_weight: number })[];

  const lessonIds = [...new Set(chunks.map((c) => c.lesson_id).filter(Boolean))];
  const { data: lessons } = lessonIds.length
    ? await supabase()
        .from("graph_lessons")
        .select("*")
        .in("id", lessonIds)
        .order("sort_key")
    : { data: [] };

  const { data: exercises } = await supabase()
    .from("exercise_concepts")
    .select("is_primary, exercise:graph_exercises(*, items:exercise_items(*))")
    .eq("concept_id", conceptId);

  const { data: prereqs } = await supabase()
    .from("concept_edges")
    .select("weight, from:from_node(*)")
    .eq("to_node", conceptId)
    .eq("type", "REQUIRES");

  const { data: nextConcepts } = await supabase()
    .from("concept_edges")
    .select("weight, to:to_node(*)")
    .eq("from_node", conceptId)
    .eq("type", "REQUIRES");

  const { data: related } = await supabase()
    .from("concept_edges")
    .select("type, to:to_node(*)")
    .eq("from_node", conceptId)
    .neq("type", "REQUIRES");

  return {
    concept: concept as GraphNode,
    lessons: (lessons ?? []) as GraphLesson[],
    chunks: chunks as (GraphChunk & { edge_type: ContentEdgeType; edge_weight: number })[],
    exercises: (exercises ?? []).map((e: any) => e.exercise) as (GraphExercise & {
      items: ExerciseItem[];
    })[],
    prerequisites: (prereqs ?? []).map((p: any) => ({
      ...p.from,
      edge_weight: p.weight,
    })) as (GraphNode & { edge_weight: number })[],
    nextConcepts: (nextConcepts ?? []).map((p: any) => ({
      ...p.to,
      edge_weight: p.weight,
    })) as (GraphNode & { edge_weight: number })[],
    related: (related ?? []).map((r: any) => ({
      ...r.to,
      edge_type: r.type as ConceptEdgeType,
    })) as (GraphNode & { edge_type: ConceptEdgeType })[],
  };
}

export async function searchConcepts(query: string, limit = 10): Promise<GraphNode[]> {
  const { data, error } = await supabase()
    .from("graph_nodes")
    .select("*")
    .or(
      `label_default.ilike.%${query}%,label_somali.ilike.%${query}%,label_english.ilike.%${query}%`
    )
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as GraphNode[];
}

export async function searchContent(query: string, limit = 10) {
  const { data, error } = await supabase()
    .from("graph_chunks")
    .select("*")
    .textSearch("search_vector", query)
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

// ─── Roadmap / Learning Path ─────────────────────────────────────────

export async function getLearningFrontier(
  userId: string,
  masteryThreshold = 0.7
): Promise<(GraphNode & { mastery: number | null })[]> {
  const { data, error } = await supabase().rpc("get_learning_frontier", {
    p_user_id: userId,
    p_threshold: masteryThreshold,
  });
  if (error) {
    return getLearningFrontierClient(userId, masteryThreshold);
  }
  return (data ?? []) as (GraphNode & { mastery: number | null })[];
}

async function getLearningFrontierClient(
  userId: string,
  threshold: number
): Promise<(GraphNode & { mastery: number | null })[]> {
  const { data: mastered } = await supabase()
    .from("learner_concept_states")
    .select("concept_id")
    .eq("user_id", userId)
    .gte("mastery", threshold);

  const masteredIds = new Set((mastered ?? []).map((m) => m.concept_id));

  const { data: concepts } = await supabase()
    .from("graph_nodes")
    .select("*, reqs:concept_edges!to_node(type, from_node)")
    .eq("type", "CONCEPT");

  return (concepts ?? []).filter((c: any) => {
    const reqs = (c.reqs ?? []).filter((r: any) => r.type === "REQUIRES");
    if (reqs.length === 0) return false;
    const allMet = reqs.every((r: any) => masteredIds.has(r.from_node));
    const alreadyMastered = masteredIds.has(c.id);
    return allMet && !alreadyMastered;
  });
}

export async function getPrerequisiteChain(
  conceptId: string,
  maxDepth = 5
): Promise<GraphNode[][]> {
  const paths: GraphNode[][] = [];

  async function walk(currentId: string, path: GraphNode[], depth: number) {
    if (depth >= maxDepth) {
      if (path.length > 0) paths.push([...path]);
      return;
    }
    const { data: prereqs } = await supabase()
      .from("concept_edges")
      .select("from:from_node(*)")
      .eq("to_node", currentId)
      .eq("type", "REQUIRES");

    const nodes = (prereqs ?? []).map((p: any) => p.from);
    if (nodes.length === 0) {
      if (path.length > 0) paths.push([...path]);
      return;
    }
    for (const p of nodes) {
      path.push(p);
      await walk(p.id, path, depth + 1);
      path.pop();
    }
  }

  await walk(conceptId, [], 0);
  return paths;
}

// ─── SRS / Review ────────────────────────────────────────────────────

export async function submitReview(params: {
  userId: string;
  conceptId: string;
  exerciseId?: string;
  rating: 1 | 2 | 3 | 4;
  studyTimeSeconds: number;
}): Promise<{
  mastery: number;
  stability: number;
  nextReviewAt: string;
  lapsed: boolean;
}> {
  const { data, error } = await supabase().rpc("submit_review", {
    p_user_id: params.userId,
    p_concept_id: params.conceptId,
    p_exercise_id: params.exerciseId ?? null,
    p_rating: params.rating,
    p_study_time_seconds: params.studyTimeSeconds,
  });
  if (error) throw error;
  return data;
}

export async function getDueReviews(
  userId: string,
  limit = 20
): Promise<(LearnerConceptState & { node: GraphNode })[]> {
  const { data, error } = await supabase()
    .from("learner_concept_states")
    .select("*, node:graph_nodes!inner(*)")
    .eq("user_id", userId)
    .lte("next_review_at", new Date().toISOString())
    .order("retrievability", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as (LearnerConceptState & { node: GraphNode })[];
}

export async function getMasteryStats(userId: string): Promise<MasteryStats> {
  const { data, error } = await supabase().rpc("get_mastery_stats", {
    p_user_id: userId,
  });
  if (error) throw error;
  return data ?? { totalConcepts: 0, mastered: 0, learning: 0, new: 0, dueToday: 0 };
}

// ─── Progress ────────────────────────────────────────────────────────

export async function getUnitProgress(
  userId: string,
  textbookId: string
): Promise<UnitProgress[]> {
  const { data, error } = await supabase().rpc("get_unit_progress", {
    p_user_id: userId,
    p_textbook_id: textbookId,
  });
  if (error) throw error;
  return (data ?? []) as UnitProgress[];
}

export async function getRecommendedLesson(
  userId: string,
  textbookId: string
): Promise<GraphLesson | null> {
  const { data, error } = await supabase().rpc("get_recommended_unit", {
    p_user_id: userId,
    p_textbook_id: textbookId,
  });
  if (error || !data) return null;
  const lessonId = `lesson:${textbookId.split("-")[0]}:${data.chapter}`;
  const { data: lesson } = await supabase()
    .from("graph_lessons")
    .select("*")
    .eq("id", lessonId)
    .single();
  return lesson as GraphLesson | null;
}

// ─── Utility ─────────────────────────────────────────────────────────

export async function getLessonWithContext(lessonId: string) {
  const { data: lesson } = await supabase()
    .from("graph_lessons")
    .select("*")
    .eq("id", lessonId)
    .single();
  if (!lesson) return null;

  const [prev, next] = await Promise.all([
    lesson.previous_lesson
      ? supabase()
          .from("graph_lessons")
          .select("id, title")
          .eq("id", lesson.previous_lesson)
          .single()
          .then(({ data }) => data)
      : Promise.resolve(null),
    lesson.next_lesson
      ? supabase()
          .from("graph_lessons")
          .select("id, title")
          .eq("id", lesson.next_lesson)
          .single()
          .then(({ data }) => data)
      : Promise.resolve(null),
  ]);

  return { lesson: lesson as GraphLesson, previous: prev as GraphLesson | null, next: next as GraphLesson | null };
}

export async function getTextbookConcepts(textbookId: string) {
  const { data, error } = await supabase().rpc("get_concepts_by_textbook", {
    p_textbook_id: textbookId,
  });
  if (error) throw error;
  return (data ?? []) as any[];
}

export async function getExerciseItems(exerciseId: string): Promise<ExerciseItem[]> {
  const { data, error } = await supabase()
    .from("exercise_items")
    .select("*")
    .eq("exercise_id", exerciseId)
    .order("item_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ExerciseItem[];
}
