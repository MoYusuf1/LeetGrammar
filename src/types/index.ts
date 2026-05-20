export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  unitId: number;
  color: string;
  lessonIds: number[];
  prerequisites: string[];
}

// Re-export pedagogical schema types
export * from "@/lib/supabase/lesson-types";
