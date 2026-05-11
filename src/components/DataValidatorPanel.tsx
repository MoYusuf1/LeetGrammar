import { useState, useCallback } from 'react';
import { AlertTriangle, Check, Loader2, Shield } from 'lucide-react';
import { runFullValidation, type ValidationResult } from '@/lib/data-validator';

export default function DataValidatorPanel() {
  const [running, setRunning] = useState(false);
  const [graphResults, setGraphResults] = useState<ValidationResult[]>([]);
  const [progressResults, setProgressResults] = useState<ValidationResult[]>([]);
  const [runCount, setRunCount] = useState(0);

  const run = useCallback(async () => {
    setRunning(true);
    const { graph, progress } = await runFullValidation();
    setGraphResults(graph);
    setProgressResults(progress);
    setRunCount((c) => c + 1);
    setRunning(false);
  }, []);

  const allPassed =
    runCount > 0 &&
    [...graphResults, ...progressResults].every((r) => r.passed);

  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#eff1f6] flex items-center gap-2">
          <Shield size={14} className="text-[#3b82f6]" />
          Data Integrity Check
        </h3>
        <button
          onClick={run}
          disabled={running}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1a] border border-[#ffffff10] text-xs font-medium text-[#eff1f6] hover:bg-[#222] transition-colors disabled:opacity-50"
        >
          {running ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
          {running ? 'Running...' : 'Run Check'}
        </button>
      </div>

      {runCount > 0 && (
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
            allPassed
              ? 'bg-[#00b8a3]10 text-[#00b8a3] border border-[#00b8a3]20'
              : 'bg-[#ef4444]10 text-[#ef4444] border border-[#ef4444]20'
          }`}
        >
          {allPassed ? (
            <Check size={14} />
          ) : (
            <AlertTriangle size={14} />
          )}
          {allPassed
            ? 'All checks passed — data is clean.'
            : 'Issues found — review details below.'}
        </div>
      )}

      {graphResults.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">Knowledge Graph</p>
          {graphResults.map((r, i) => (
            <ResultRow key={`g-${i}`} result={r} />
          ))}
        </div>
      )}

      {progressResults.length > 0 && (
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-[#5c5c5c] uppercase tracking-wider">User Progress</p>
          {progressResults.map((r, i) => (
            <ResultRow key={`p-${i}`} result={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function ResultRow({ result }: { result: ValidationResult }) {
  return (
    <div className="flex items-start gap-2 text-xs">
      {result.passed ? (
        <Check size={14} className="text-[#00b8a3] mt-0.5 flex-shrink-0" />
      ) : (
        <AlertTriangle size={14} className="text-[#ef4444] mt-0.5 flex-shrink-0" />
      )}
      <div className="flex-1">
        <span className={result.passed ? 'text-[#8c8c8c]' : 'text-[#ef4444]'}>
          {result.message}
        </span>
        {typeof result.count === 'number' && (
          <span className="text-[#5c5c5c] ml-1">({result.count})</span>
        )}
        {result.details && result.details.length > 0 && (
          <div className="mt-1 space-y-0.5">
            {result.details.slice(0, 5).map((d, i) => (
              <p key={i} className="text-[10px] text-[#5c5c5c] pl-2 border-l border-[#ffffff08]">
                {d}
              </p>
            ))}
            {result.details.length > 5 && (
              <p className="text-[10px] text-[#5c5c5c]">+{result.details.length - 5} more</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
