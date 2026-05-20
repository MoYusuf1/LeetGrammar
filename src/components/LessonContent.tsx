/**
 * LessonContent — Renders individual lesson sections based on chunk_type.
 *
 * Handles markdown-like content from textbook extractions:
 * - Bold, italic, headers, lists, tables
 * - Strips extraction artifacts (leading "E" from OCR)
 */

import type { GraphChunk } from "@/lib/supabase/lesson-types";

interface LessonContentProps {
  chunk: GraphChunk;
  title: string | null;
}

export default function LessonContent({ chunk, title }: LessonContentProps) {
  const { chunk_type, payload } = chunk;

  switch (chunk_type) {
    case "dialogue":
      return <DialogueChunk payload={payload} title={title} />;
    case "dialogue-translation":
      return <TranslationChunk payload={payload} title={title} />;
    case "vocabulary":
      return <VocabularyChunk payload={payload} title={title} />;
    case "grammar":
      return <GrammarChunk payload={payload} title={title} />;
    case "cultural-note":
      return <CulturalNoteChunk payload={payload} title={title} />;
    case "exercise-prompt":
      return <ExercisePromptChunk payload={payload} title={title} />;
    case "memo":
      return <MemoChunk payload={payload} title={title} />;
    case "paradigm":
      return <ParadigmChunk payload={payload} title={title} />;
    case "overview":
    case "reading":
    default:
      return <GenericChunk payload={payload} title={title} />;
  }
}

/** Strip common OCR/extraction artifacts from the start of payloads. */
function cleanPayload(payload: string): string {
  return payload.replace(/^[\s]*E[\s]*/m, "").trim();
}

function SectionTitle({ title, chunk_type }: { title: string | null; chunk_type: string }) {
  if (!title) return null;
  const colors: Record<string, string> = {
    dialogue: "#3b82f6",
    "dialogue-translation": "#3b82f6",
    vocabulary: "#22c55e",
    grammar: "#a855f7",
    "cultural-note": "#f59e0b",
    "exercise-prompt": "#ef4444",
    memo: "#8c8c8c",
    paradigm: "#06b6d4",
    overview: "#8c8c8c",
    reading: "#3b82f6",
  };
  const color = colors[chunk_type] ?? "#8c8c8c";
  return (
    <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color }}>
      {title}
    </h3>
  );
}

/** Simple markdown-to-JSX renderer for chunk payloads. */
function MarkdownContent({ text, className = "" }: { text: string; className?: string }) {
  const cleaned = cleanPayload(text);
  const blocks = parseBlocks(cleaned);

  return (
    <div className={className}>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} />
      ))}
    </div>
  );
}

type Block =
  | { type: "paragraph"; content: string }
  | { type: "header"; level: number; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "list"; items: string[] }
  | { type: "divider" };

function parseBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line.trim())) {
      blocks.push({ type: "divider" });
      i++;
      continue;
    }

    // Header
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headerMatch) {
      blocks.push({ type: "header", level: headerMatch[1].length, content: headerMatch[2].trim() });
      i++;
      continue;
    }

    // Table
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const parsed = parseTable(tableLines);
      if (parsed) blocks.push(parsed);
      continue;
    }

    // List
    if (/^\s*[-*]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || (/^\s+/.test(lines[i]) && lines[i].trim()))) {
        const match = lines[i].match(/^\s*[-*]\s+(.+)$/);
        if (match) items.push(match[1]);
        else if (items.length > 0) items[items.length - 1] += " " + lines[i].trim();
        i++;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    // Paragraph (collect lines until empty line or special block)
    const paraLines: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !lines[i].trim().startsWith("|") && !/^#{1,6}\s/.test(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^---+\s*$/.test(lines[i].trim())) {
      paraLines.push(lines[i]);
      i++;
    }
    blocks.push({ type: "paragraph", content: paraLines.join(" ") });
  }

  return blocks;
}

function parseTable(lines: string[]): Block | null {
  if (lines.length < 2) return null;
  const rows = lines.map((l) =>
    l
      .split("|")
      .map((c) => c.trim())
      .filter((c) => c)
  );
  if (rows.length < 2) return null;

  // Remove separator row (---)
  const dataRows = rows.filter((r) => !r.every((c) => /^[-:]+$/.test(c)));
  if (dataRows.length < 1) return null;

  return { type: "table", headers: dataRows[0], rows: dataRows.slice(1) };
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <InlineText text={block.content} className="text-sm text-[#c8c8c8] leading-relaxed mb-3 last:mb-0" />;
    case "header":
      const sizes = ["text-lg", "text-base", "text-sm", "text-sm", "text-xs", "text-xs"];
      return (
        <h4 className={`${sizes[block.level - 1]} font-bold text-[#eff1f6] mt-4 mb-2`}>
          {block.content}
        </h4>
      );
    case "table":
      return (
        <div className="overflow-x-auto mb-3">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#ffffff15]">
                {block.headers.map((h, j) => (
                  <th key={j} className="text-left py-1.5 pr-3 text-[#8c8c8c] font-semibold text-xs">
                    <InlineText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#ffffff06]">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-1.5 pr-3 text-[#c8c8c8]">
                      <InlineText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "list":
      return (
        <ul className="list-disc list-inside mb-3 space-y-1">
          {block.items.map((item, li) => (
            <li key={li} className="text-sm text-[#c8c8c8]">
              <InlineText text={item} />
            </li>
          ))}
        </ul>
      );
    case "divider":
      return <hr className="border-[#ffffff08] my-4" />;
  }
}

/** Render inline formatting: bold, italic, links. */
function InlineText({ text, className = "" }: { text: string; className?: string }) {
  // Split by bold/italic patterns and render as spans
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_)/g);

  const nodes = parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-[#eff1f6] font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return <strong key={i} className="text-[#eff1f6] font-semibold">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("_") && part.endsWith("_")) {
      return <em key={i} className="italic">{part.slice(1, -1)}</em>;
    }
    return <span key={i}>{part}</span>;
  });

  return <span className={className}>{nodes}</span>;
}

// ─── Chunk-type specific wrappers ────────────────────────────────────

function DialogueChunk({ payload, title }: { payload: string; title: string | null }) {
  const lines = cleanPayload(payload).split("\n").filter(Boolean);
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <SectionTitle title={title} chunk_type="dialogue" />
      <div className="space-y-2">
        {lines.map((line, i) => {
          const match = line.match(/^([A-Za-z\s]+):\s*(.+)$/);
          if (match) {
            const [, speaker, text] = match;
            return (
              <div key={i} className="flex gap-2">
                <span className="text-xs font-semibold text-[#ffa116] flex-shrink-0">{speaker}:</span>
                <InlineText text={text} className="text-sm text-[#eff1f6]" />
              </div>
            );
          }
          return (
            <p key={i} className="text-sm text-[#eff1f6]">
              <InlineText text={line} />
            </p>
          );
        })}
      </div>
    </div>
  );
}

function TranslationChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <SectionTitle title={title ?? "Translation"} chunk_type="dialogue-translation" />
      <MarkdownContent text={payload} className="text-sm text-[#8c8c8c] italic" />
    </div>
  );
}

function VocabularyChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <SectionTitle title={title ?? "Vocabulary"} chunk_type="vocabulary" />
      <MarkdownContent text={payload} />
    </div>
  );
}

function GrammarChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <SectionTitle title={title ?? "Grammar"} chunk_type="grammar" />
      <MarkdownContent text={payload} />
    </div>
  );
}

function CulturalNoteChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#ffa11608] border border-[#ffa11625] p-4">
      <SectionTitle title={title ?? "Cultural Note"} chunk_type="cultural-note" />
      <MarkdownContent text={payload} />
    </div>
  );
}

function ExercisePromptChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#ef444408] border border-[#ef444425] p-4">
      <SectionTitle title={title ?? "Exercise"} chunk_type="exercise-prompt" />
      <MarkdownContent text={payload} />
    </div>
  );
}

function MemoChunk({ payload }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-lg bg-[#1a1a1a] border border-[#ffffff06] p-3">
      <MarkdownContent text={payload} className="text-xs text-[#5c5c5c]" />
    </div>
  );
}

function ParadigmChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      <SectionTitle title={title ?? "Paradigm"} chunk_type="paradigm" />
      <MarkdownContent text={payload} />
    </div>
  );
}

function GenericChunk({ payload, title }: { payload: string; title: string | null }) {
  return (
    <div className="rounded-xl bg-[#141414] border border-[#ffffff08] p-4">
      {title && <h3 className="text-xs font-bold uppercase tracking-wider text-[#8c8c8c] mb-2">{title}</h3>}
      <MarkdownContent text={payload} />
    </div>
  );
}
