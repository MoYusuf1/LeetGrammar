/**
 * Ingestion page — drag & drop swarm JSON, preview, validate, commit.
 */

import { useState, useCallback, useRef, useMemo } from 'react';
import {
  Upload,
  FileJson,
  AlertTriangle,
  CheckCircle2,
  X,
  GitMerge,
  Layers,
  Link2,
  Box,
  FileText,
  ChevronDown,
  ChevronUp,
  Play,
  RotateCcw,
  Eye,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import { parseSwarmOutput, mergePayloads, type ParsedPayload, type ValidationError } from '@/engine/swarm-loader';
import { generateDiffReport } from '@/engine/ingestion';
import type { TextbookPayload } from '@/engine/ingestion';

interface LoadedFile {
  name: string;
  size: number;
  payloads: ParsedPayload[];
  expanded: boolean;
}

export default function Ingest() {
  useGraphInit();
  const { engine, stats, ingestPayload, saveToSQLite } = useGraphStore();
  const [files, setFiles] = useState<LoadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allPayloads = useMemo(() => {
    return files.flatMap((f) => f.payloads);
  }, [files]);

  const mergedPayload = useMemo<TextbookPayload | null>(() => {
    if (allPayloads.length === 0) return null;
    return mergePayloads(allPayloads);
  }, [allPayloads]);

  const previewStats = useMemo(() => {
    if (!mergedPayload) return null;
    const existingNodes = mergedPayload.nodes.filter((n: { id: string }) => engine.hasNode(n.id));
    const newNodes = mergedPayload.nodes.filter((n: { id: string }) => !engine.hasNode(n.id));
    return {
      totalNodes: mergedPayload.nodes.length,
      newNodes: newNodes.length,
      existingNodes: existingNodes.length,
      totalEdges: mergedPayload.edges.length,
      totalConstructions: mergedPayload.constructions.length,
      totalChunks: mergedPayload.chunks.length,
    };
  }, [mergedPayload, engine]);

  const totalErrors = useMemo(() => {
    return allPayloads.reduce((sum, p) => sum + p.errors.length, 0);
  }, [allPayloads]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFiles = useCallback(async (fileList: FileList) => {
    setIsLoading(true);
    const newFiles: LoadedFile[] = [];

    for (const file of Array.from(fileList)) {
      if (!file.name.endsWith('.json')) continue;
      try {
        const text = await file.text();
        const raw = JSON.parse(text);
        const payloads = await parseSwarmOutput(raw);
        newFiles.push({
          name: file.name,
          size: file.size,
          payloads,
          expanded: false,
        });
      } catch {
        newFiles.push({
          name: file.name,
          size: file.size,
          payloads: [],
          expanded: false,
        });
      }
    }

    setFiles((prev) => [...prev, ...newFiles]);
    setIsLoading(false);
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
  }, [processFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
    e.target.value = '';
  }, [processFiles]);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setLastResult(null);
  }, []);

  const toggleExpanded = useCallback((index: number) => {
    setFiles((prev) =>
      prev.map((f, i) => (i === index ? { ...f, expanded: !f.expanded } : f))
    );
  }, []);

  const handleCommit = useCallback(() => {
    if (!mergedPayload) return;
    const result = ingestPayload(mergedPayload);
    const report = generateDiffReport(result);
    setLastResult(report);
    void saveToSQLite();
  }, [mergedPayload, ingestPayload, saveToSQLite]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setLastResult(null);
  }, []);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[720px] mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <GitMerge size={18} className="text-[#ffa116]" />
            <h1 className="text-xl font-bold text-[#eff1f6]">Ingest</h1>
          </div>
          <p className="text-xs text-[#8c8c8c]">
            {stats.nodes} nodes · {stats.edges} edges · {stats.constructions} constructions in graph
          </p>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="max-w-[720px] mx-auto space-y-5">
          {/* Drop Zone */}
          <section>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? 'border-[#ffa116] bg-[#ffa116]08'
                  : 'border-[#ffffff15] bg-[#141414] hover:border-[#ffffff25] hover:bg-[#1a1a1a]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                multiple
                onChange={handleFileInput}
                className="hidden"
              />
              <Upload
                size={28}
                className={`mx-auto mb-3 ${isDragging ? 'text-[#ffa116]' : 'text-[#5c5c5c]'}`}
              />
              <p className="text-sm font-medium text-[#c8c8c8]">
                Drop swarm JSON files here, or click to browse
              </p>
              <p className="text-[10px] text-[#5c5c5c] mt-1.5">
                Accepts single chapter objects or arrays of chapters
              </p>
            </div>
          </section>

          {/* Loaded Files */}
          {files.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">
                  Loaded Files ({files.length})
                </p>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1 text-[10px] text-[#8c8c8c] hover:text-[#ef4444] transition-colors"
                >
                  <RotateCcw size={10} />
                  Clear all
                </button>
              </div>

              <div className="space-y-2">
                {files.map((file, i) => (
                  <FileCard
                    key={`${file.name}-${i}`}
                    file={file}
                    index={i}
                    onRemove={removeFile}
                    onToggle={() => toggleExpanded(i)}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Global Preview */}
          {mergedPayload && previewStats && (
            <section>
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
                Global Preview
              </p>
              <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <PreviewStat
                    icon={<Box size={14} className="text-[#3b82f6]" />}
                    label="Nodes"
                    value={previewStats.totalNodes}
                    sub={`${previewStats.newNodes} new · ${previewStats.existingNodes} existing`}
                  />
                  <PreviewStat
                    icon={<Link2 size={14} className="text-[#22c55e]" />}
                    label="Edges"
                    value={previewStats.totalEdges}
                  />
                  <PreviewStat
                    icon={<Layers size={14} className="text-[#a855f7]" />}
                    label="Constructions"
                    value={previewStats.totalConstructions}
                  />
                  <PreviewStat
                    icon={<FileText size={14} className="text-[#f59e0b]" />}
                    label="Chunks"
                    value={previewStats.totalChunks}
                  />
                </div>

                {totalErrors > 0 && (
                  <div className="flex items-center gap-2 rounded-lg bg-[#ef4444]08 border border-[#ef4444]15 px-3 py-2">
                    <AlertTriangle size={14} className="text-[#ef4444]" />
                    <span className="text-xs text-[#ef4444]">
                      {totalErrors} validation issue{totalErrors > 1 ? 's' : ''} across all files
                    </span>
                  </div>
                )}

                {previewStats.existingNodes > 0 && (
                  <div className="flex items-center gap-2 rounded-lg bg-[#3b82f6]08 border border-[#3b82f6]15 px-3 py-2">
                    <Eye size={14} className="text-[#3b82f6]" />
                    <span className="text-xs text-[#3b82f6]">
                      {previewStats.existingNodes} node{previewStats.existingNodes > 1 ? 's' : ''} already exist and will be attributed as multi-source
                    </span>
                  </div>
                )}

                <button
                  onClick={handleCommit}
                  disabled={isLoading || previewStats.totalNodes === 0}
                  className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-[#ffa116] text-[#1a1a1a] text-sm font-semibold hover:bg-[#ffb800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Play size={16} />
                  Ingest into Graph
                </button>
              </div>
            </section>
          )}

          {/* Post-ingestion Report */}
          {lastResult && (
            <section>
              <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
                Ingestion Report
              </p>
              <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
                <pre className="text-[11px] text-[#8c8c8c] font-mono whitespace-pre-wrap leading-relaxed">
                  {lastResult}
                </pre>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewStat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
}) {
  return (
    <div className="rounded-lg bg-[#0f0f0f] border border-[#ffffff06] px-3 py-2.5">
      <div className="flex items-center gap-1.5 mb-1">
        {icon}
        <span className="text-[10px] text-[#5c5c5c] font-medium">{label}</span>
      </div>
      <p className="text-lg font-bold text-[#eff1f6]">{value}</p>
      {sub && <p className="text-[9px] text-[#5c5c5c] mt-0.5">{sub}</p>}
    </div>
  );
}

function FileCard({
  file,
  index,
  onRemove,
  onToggle,
}: {
  file: LoadedFile;
  index: number;
  onRemove: (i: number) => void;
  onToggle: () => void;
}) {
  const totalPayloads = file.payloads.length;
  const totalErrors = file.payloads.reduce((s, p) => s + p.errors.length, 0);
  const totalNodes = file.payloads.reduce((s, p) => s + p.payload.nodes.length, 0);
  const totalEdges = file.payloads.reduce((s, p) => s + p.payload.edges.length, 0);
  const totalConstructions = file.payloads.reduce((s, p) => s + p.payload.constructions.length, 0);

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <FileJson size={16} className="text-[#ffa116] flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#eff1f6] truncate">{file.name}</p>
            <p className="text-[10px] text-[#5c5c5c]">
              {(file.size / 1024).toFixed(1)} KB · {totalPayloads} chapter{totalPayloads !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {totalErrors > 0 && (
            <span className="flex items-center gap-1 text-[10px] text-[#ef4444] bg-[#ef4444]10 px-1.5 py-0.5 rounded">
              <AlertTriangle size={10} />
              {totalErrors}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className="p-1 rounded hover:bg-[#ffffff08] text-[#5c5c5c] hover:text-[#eff1f6] transition-colors"
          >
            {file.expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            className="p-1 rounded hover:bg-[#ef4444]10 text-[#5c5c5c] hover:text-[#ef4444] transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {file.expanded && (
        <div className="px-3.5 pb-3.5 space-y-3 border-t border-[#ffffff06]">
          {/* Summary row */}
          <div className="flex items-center gap-4 pt-2 text-[10px] text-[#8c8c8c]">
            <span className="flex items-center gap-1">
              <Box size={10} />
              {totalNodes} nodes
            </span>
            <span className="flex items-center gap-1">
              <Link2 size={10} />
              {totalEdges} edges
            </span>
            <span className="flex items-center gap-1">
              <Layers size={10} />
              {totalConstructions} constructions
            </span>
          </div>

          {/* Per-chapter breakdown */}
          {file.payloads.map((payload, pi) => (
            <div key={pi} className="rounded-lg bg-[#0f0f0f] border border-[#ffffff06] p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-[#c8c8c8]">
                  {payload.chapter || `Chapter ${pi + 1}`}
                  {payload.pageRange && <span className="text-[#5c5c5c] ml-1">({payload.pageRange})</span>}
                </p>
                {payload.errors.length === 0 ? (
                  <CheckCircle2 size={12} className="text-[#22c55e]" />
                ) : (
                  <span className="text-[10px] text-[#ef4444]">{payload.errors.length} issues</span>
                )}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[#5c5c5c] mb-2">
                <span>{payload.payload.nodes.length} nodes</span>
                <span>{payload.payload.edges.length} edges</span>
                <span>{payload.payload.constructions.length} constructions</span>
                <span>{payload.payload.chunks.length} chunks</span>
              </div>
              {payload.errors.length > 0 && (
                <div className="space-y-1">
                  {payload.errors.slice(0, 5).map((err, ei) => (
                    <ErrorRow key={ei} error={err} />
                  ))}
                  {payload.errors.length > 5 && (
                    <p className="text-[10px] text-[#5c5c5c] pl-5">
                      +{payload.errors.length - 5} more issues
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ErrorRow({ error }: { error: ValidationError }) {
  return (
    <div className="flex items-start gap-1.5">
      <AlertTriangle size={10} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
      <div className="min-w-0">
        {error.path && (
          <span className="text-[10px] text-[#5c5c5c] font-mono">{error.path}</span>
        )}
        <p className="text-[10px] text-[#ef4444]">{error.message}</p>
      </div>
    </div>
  );
}
