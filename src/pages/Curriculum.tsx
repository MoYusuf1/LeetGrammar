/**
 * Curriculum page — path generation, validation, and export/import.
 */

import { useState, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router';
import {
  GitFork,
  AlertTriangle,
  CheckCircle2,
  Download,
  Upload,
  Database,
  MapPin,
  Route,
  Save,
} from 'lucide-react';
import { useGraphStore } from '@/stores/graph-store';
import { useGraphInit } from '@/hooks/useGraphInit';
import { generateLearningPath, validateCurriculum, shortestPath } from '@/engine/curriculum';
import { readJSONFile, importFromJSON, readBinaryFile } from '@/engine/export-import';

export default function Curriculum() {
  useGraphInit();
  const navigate = useNavigate();
  const { engine, isPersisted, isLoading, exportToJSON, exportToSQLite, importFromJSON: importGraphJSON, saveToSQLite, loadFromSQLite } = useGraphStore();

  const [targetId, setTargetId] = useState('');
  const [fromId, setFromId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sqliteInputRef = useRef<HTMLInputElement>(null);

  const validation = useMemo(() => validateCurriculum(engine), [engine]);

  const learningPath = useMemo(() => {
    if (!targetId) return null;
    return generateLearningPath(engine, targetId);
  }, [engine, targetId]);

  const shortest = useMemo(() => {
    if (!fromId || !targetId || fromId === targetId) return null;
    return shortestPath(engine, fromId, targetId);
  }, [engine, fromId, targetId]);

  const conceptOptions = useMemo(() => {
    return engine.getAllNodes().filter((n) => n.type === 'CONCEPT' || n.type === 'LESSON');
  }, [engine]);

  const handleImportJSON = useCallback(async () => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const raw = await readJSONFile(file);
      const data = importFromJSON(raw);
      if (data) {
        importGraphJSON(data);
      } else {
        alert('Invalid graph file format');
      }
    } catch {
      alert('Failed to read file');
    }
    e.target.value = '';
  }, [importGraphJSON]);

  const handleImportSQLite = useCallback(async () => {
    sqliteInputRef.current?.click();
  }, []);

  const handleSQLiteChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await readBinaryFile(file);
      const { persistence } = useGraphStore.getState();
      await persistence.importDatabase(data);
      await loadFromSQLite();
    } catch {
      alert('Failed to read SQLite file');
    }
    e.target.value = '';
  }, [loadFromSQLite]);

  return (
    <div className="min-h-full bg-[#0f0f0f]">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 bg-[#0f0f0f] border-b border-[#ffffff08]">
        <div className="max-w-[640px] mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <Route size={18} className="text-[#ffa116]" />
            <h1 className="text-xl font-bold text-[#eff1f6]">Curriculum</h1>
          </div>
          <p className="text-xs text-[#8c8c8c]">
            {engine.stats.nodes} nodes · {engine.stats.edges} edges · {validation.valid ? 'Valid' : 'Issues detected'}
          </p>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="max-w-[640px] mx-auto space-y-6">
          {/* Validation Status */}
          <section>
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
              Validation
            </p>
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 p-3 rounded-xl border ${
                  validation.valid
                    ? 'bg-[#22c55e]10 border-[#22c55e]20'
                    : 'bg-[#ef4444]10 border-[#ef4444]20'
                }`}
              >
                {validation.valid ? (
                  <CheckCircle2 size={16} className="text-[#22c55e]" />
                ) : (
                  <AlertTriangle size={16} className="text-[#ef4444]" />
                )}
                <span className={`text-sm font-medium ${validation.valid ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                  {validation.valid ? 'Curriculum is valid' : 'Curriculum has issues'}
                </span>
              </div>

              {validation.cycles.length > 0 && (
                <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5">
                  <p className="text-xs font-semibold text-[#ef4444] mb-2">
                    {validation.cycles.length} cycle{validation.cycles.length > 1 ? 's' : ''} detected
                  </p>
                  {validation.cycles.map((cycle, i) => (
                    <p key={i} className="text-[10px] text-[#8c8c8c] font-mono">
                      {cycle.join(' → ')}
                    </p>
                  ))}
                </div>
              )}

              {validation.orphanedNodes.length > 0 && (
                <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5">
                  <p className="text-xs font-semibold text-[#eab308] mb-2">
                    {validation.orphanedNodes.length} orphaned node{validation.orphanedNodes.length > 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {validation.orphanedNodes.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => navigate(`/wiki/${n.id}`)}
                        className="text-[10px] px-2 py-1 rounded-md bg-[#1a1a1a] text-[#8c8c8c] hover:text-[#eff1f6]"
                      >
                        {n.labels.default}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-[10px] text-[#5c5c5c]">
                <GitFork size={10} />
                <span>{validation.disconnectedComponents} connected component{validation.disconnectedComponents > 1 ? 's' : ''}</span>
              </div>
            </div>
          </section>

          {/* Learning Path Generator */}
          <section>
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
              Learning Path
            </p>
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-[#8c8c8c] mb-1 block">Target Concept</label>
                <select
                  value={targetId}
                  onChange={(e) => setTargetId(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] focus:outline-none focus:border-[#ffa116]50"
                >
                  <option value="">Select a concept...</option>
                  {conceptOptions.map((n) => (
                    <option key={n.id} value={n.id}>
                      {n.labels.default}
                    </option>
                  ))}
                </select>
              </div>

              {learningPath && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#8c8c8c]">
                    <MapPin size={12} className="text-[#ffa116]" />
                    <span>
                      {learningPath.path.length} step{learningPath.path.length > 1 ? 's' : ''} · ~{learningPath.estimatedMinutes} min
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {learningPath.path.map((node, i) => (
                      <div key={node.id} className="flex items-center gap-1.5">
                        {i > 0 && <span className="text-[#5c5c5c]">→</span>}
                        <button
                          onClick={() => navigate(`/wiki/${node.id}`)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                            node.id === targetId
                              ? 'bg-[#ffa116]20 text-[#ffa116] border border-[#ffa116]30'
                              : 'bg-[#1a1a1a] text-[#c8c8c8] border border-[#ffffff08] hover:text-[#eff1f6]'
                          }`}
                        >
                          {node.labels.default}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Shortest Path */}
          <section>
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
              Shortest Path
            </p>
            <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-3.5 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-semibold text-[#8c8c8c] mb-1 block">From</label>
                  <select
                    value={fromId}
                    onChange={(e) => setFromId(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] focus:outline-none focus:border-[#ffa116]50"
                  >
                    <option value="">Start...</option>
                    {conceptOptions.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.labels.default}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-[#8c8c8c] mb-1 block">To</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="w-full h-9 px-3 rounded-lg bg-[#0f0f0f] border border-[#ffffff08] text-sm text-[#eff1f6] focus:outline-none focus:border-[#ffa116]50"
                  >
                    <option value="">Target...</option>
                    {conceptOptions.map((n) => (
                      <option key={n.id} value={n.id}>
                        {n.labels.default}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {shortest ? (
                <div className="flex flex-wrap items-center gap-1.5">
                  {shortest.map((node, i) => (
                    <div key={node.id} className="flex items-center gap-1.5">
                      {i > 0 && <span className="text-[#5c5c5c]">→</span>}
                      <button
                        onClick={() => navigate(`/wiki/${node.id}`)}
                        className="text-xs px-2.5 py-1 rounded-md bg-[#1a1a1a] text-[#c8c8c8] border border-[#ffffff08] hover:text-[#eff1f6]"
                      >
                        {node.labels.default}
                      </button>
                    </div>
                  ))}
                </div>
              ) : fromId && targetId ? (
                <p className="text-xs text-[#5c5c5c]">No path found.</p>
              ) : null}
            </div>
          </section>

          {/* Persistence */}
          <section>
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
              Persistence
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => saveToSQLite()}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:bg-[#1a1a1a] hover:text-[#eff1f6] transition-colors disabled:opacity-50"
              >
                <Save size={14} />
                Save
                {isPersisted && <span className="text-[#22c55e]">●</span>}
              </button>
              <button
                onClick={() => loadFromSQLite()}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:bg-[#1a1a1a] hover:text-[#eff1f6] transition-colors disabled:opacity-50"
              >
                <Database size={14} />
                Load
              </button>
            </div>
          </section>

          {/* Export / Import */}
          <section>
            <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider mb-2.5">
              Export / Import
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => exportToJSON()}
                className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:bg-[#1a1a1a] hover:text-[#eff1f6] transition-colors"
              >
                <Download size={14} />
                Export JSON
              </button>
              <button
                onClick={handleImportJSON}
                className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:bg-[#1a1a1a] hover:text-[#eff1f6] transition-colors"
              >
                <Upload size={14} />
                Import JSON
              </button>
              <button
                onClick={() => exportToSQLite()}
                className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:bg-[#1a1a1a] hover:text-[#eff1f6] transition-colors"
              >
                <Database size={14} />
                Export SQLite
              </button>
              <button
                onClick={handleImportSQLite}
                className="flex items-center justify-center gap-2 h-10 rounded-xl bg-[#141414] border border-[#ffffff08] text-xs text-[#c8c8c8] hover:bg-[#1a1a1a] hover:text-[#eff1f6] transition-colors"
              >
                <Upload size={14} />
                Import SQLite
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
            <input
              ref={sqliteInputRef}
              type="file"
              accept=".db,.sqlite,.sqlite3"
              onChange={handleSQLiteChange}
              className="hidden"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
