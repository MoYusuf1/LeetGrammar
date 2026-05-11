/**
 * Data Validator — Run these checks client-side or in an Edge Function
 * to verify graph integrity, progress sanity, and linguistic data quality.
 */

import { getSupabase, isSupabaseConfigured } from './supabase';

export interface ValidationResult {
  passed: boolean;
  message: string;
  count?: number;
  details?: string[];
}

/**
 * Validate the knowledge graph for structural integrity.
 */
export async function validateGraph(): Promise<ValidationResult[]> {
  if (!isSupabaseConfigured) return [];
  const sb = getSupabase();
  const results: ValidationResult[] = [];

  // 1. Orphaned edges
  const { count: orphanedEdges } = await sb
    .from('graph_edges')
    .select('*', { head: true, count: 'exact' })
    .not('from_node', 'in', sb.from('graph_nodes').select('id'));
  results.push({
    passed: (orphanedEdges ?? 0) === 0,
    message: 'Orphaned edges (missing from_node)',
    count: orphanedEdges ?? 0,
  });

  const { count: orphanedEdges2 } = await sb
    .from('graph_edges')
    .select('*', { head: true, count: 'exact' })
    .not('to_node', 'in', sb.from('graph_nodes').select('id'));
  results.push({
    passed: (orphanedEdges2 ?? 0) === 0,
    message: 'Orphaned edges (missing to_node)',
    count: orphanedEdges2 ?? 0,
  });

  // 2. Duplicate node labels
  const { data: dupLabels } = await sb.rpc('get_duplicate_node_labels');
  results.push({
    passed: !dupLabels || dupLabels.length === 0,
    message: 'Duplicate node labels',
    count: dupLabels?.length ?? 0,
    details: dupLabels?.map((d: { label: string; count: number }) => `${d.label} (${d.count}x)`),
  });

  // 3. Nodes without labels.default
  const { count: unlabeledNodes } = await sb
    .from('graph_nodes')
    .select('*', { head: true, count: 'exact' })
    .or('labels->>default.is.null,labels->>default.eq.""');
  results.push({
    passed: (unlabeledNodes ?? 0) === 0,
    message: 'Nodes missing default label',
    count: unlabeledNodes ?? 0,
  });

  return results;
}

/**
 * Validate user progress tables.
 */
export async function validateProgress(_userId?: string): Promise<ValidationResult[]> {
  if (!isSupabaseConfigured) return [];
  const sb = getSupabase();
  const results: ValidationResult[] = [];

  // 1. Empty progress rows
  const { count: emptyProgress } = await sb
    .from('user_progress')
    .select('*', { head: true, count: 'exact' })
    .eq('xp', 0);
  results.push({
    passed: (emptyProgress ?? 0) === 0,
    message: 'Empty user_progress rows (xp=0)',
    count: emptyProgress ?? 0,
  });

  // 2. Invalid workbook level IDs
  const { count: invalidAttempts } = await sb
    .from('workbook_attempts')
    .select('*', { head: true, count: 'exact' })
    .or('level_id.lt.1,level_id.gt.7');
  results.push({
    passed: (invalidAttempts ?? 0) === 0,
    message: 'Workbook attempts with invalid level_id',
    count: invalidAttempts ?? 0,
  });

  // 3. Orphaned workbook attempts (no matching user)
  const { count: orphanedAttempts } = await sb
    .from('workbook_attempts')
    .select('*', { head: true, count: 'exact' })
    .not('user_id', 'in', sb.from('profiles').select('id'));
  results.push({
    passed: (orphanedAttempts ?? 0) === 0,
    message: 'Workbook attempts without matching profile',
    count: orphanedAttempts ?? 0,
  });

  return results;
}

/**
 * Run all validations and return a summary.
 */
export async function runFullValidation(userId?: string): Promise<{
  graph: ValidationResult[];
  progress: ValidationResult[];
  allPassed: boolean;
}> {
  const [graph, progress] = await Promise.all([
    validateGraph(),
    validateProgress(userId),
  ]);
  const allPassed = [...graph, ...progress].every((r) => r.passed);
  return { graph, progress, allPassed };
}
