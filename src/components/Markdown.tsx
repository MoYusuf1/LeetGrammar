// Simple markdown renderer - converts basic markdown to HTML
export function Markdown({ text }: { text: string }) {
  const html = text
    // Bold: **text** → <strong>text</strong>
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic: *text* → <em>text</em>
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Bullet lists: - item → <li>item</li>
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Headers: ## text → <h3>text</h3>
    .replace(/^## (.+)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^### (.+)$/gm, '<h4 class="text-base font-medium mt-3 mb-1">$1</h4>')
    // Newlines → <br/> or <p> tags
    .split('\n\n')
    .map((block) => {
      if (block.startsWith('<li>')) return `<ul class="list-disc pl-5 space-y-1 my-3">${block}</ul>`;
      if (block.startsWith('<h')) return block;
      if (block.trim() === '') return '';
      return `<p class="mb-3 leading-relaxed">${block}</p>`;
    })
    .join('');

  return <div className="text-[15px] text-[#d4d4d4]" dangerouslySetInnerHTML={{ __html: html }} />;
}
