import React from 'react';

interface UmeedMarkdownProps {
  content: string;
  onNavigateSection?: (sectionId: string) => void;
}

function renderInlineSegments(
  text: string,
  onNavigateSection?: (sectionId: string) => void
): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Matches [label](url), **bold**, *italic*, or `inline code`
  const tokenRegex =
    /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] !== undefined && match[3] !== undefined) {
      const linkLabel = match[2];
      const href = match[3].trim();
      if (href.startsWith('#')) {
        const targetId = href.slice(1);
        nodes.push(
          <a
            key={`lnk_${keyCounter++}`}
            href={href}
            onClick={(e) => {
              if (onNavigateSection) {
                e.preventDefault();
                onNavigateSection(targetId);
              }
            }}
            className="font-semibold text-[#14532D] underline underline-offset-4 decoration-[#14532D]/40 hover:decoration-[#113826] hover:text-[#113826] transition-colors"
          >
            {linkLabel}
          </a>
        );
      } else if (/^https?:\/\//i.test(href)) {
        nodes.push(
          <a
            key={`ext_${keyCounter++}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#14532D] underline underline-offset-4 hover:text-[#113826]"
          >
            {linkLabel}
          </a>
        );
      } else {
        nodes.push(linkLabel);
      }
    } else if (match[4] !== undefined) {
      nodes.push(
        <strong key={`b_${keyCounter++}`} className="font-semibold text-[#1C1917]">
          {match[4]}
        </strong>
      );
    } else if (match[5] !== undefined) {
      nodes.push(
        <em key={`i_${keyCounter++}`} className="italic">
          {match[5]}
        </em>
      );
    } else if (match[6] !== undefined) {
      nodes.push(
        <code
          key={`c_${keyCounter++}`}
          className="font-mono text-xs bg-[#F5F1E8] text-[#113826] px-1.5 py-0.5 rounded"
        >
          {match[6]}
        </code>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export const UmeedMarkdown: React.FC<UmeedMarkdownProps> = ({
  content,
  onNavigateSection,
}) => {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const blocks: React.ReactNode[] = [];

  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Headings (#, ##, ###)
    const headingMatch = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];
      const headingClasses =
        level === 1
          ? 'font-serif text-xl font-semibold text-[#113826] mt-3 first:mt-0 mb-2'
          : level === 2
          ? 'font-serif text-lg font-semibold text-[#113826] mt-3 first:mt-0 mb-1.5'
          : 'font-serif text-base sm:text-lg font-semibold text-[#113826] mt-2.5 first:mt-0 mb-1.5';

      blocks.push(
        <h4 key={`h_${blockKey++}`} className={headingClasses}>
          {renderInlineSegments(headingText, onNavigateSection)}
        </h4>
      );
      i++;
      continue;
    }

    // Unordered Lists (- or * or •)
    if (/^([-*•])\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^([-*•])\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^([-*•])\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={`ul_${blockKey++}`} className="my-2.5 space-y-1.5 pl-4 list-disc marker:text-[#14532D]">
          {items.map((itemText, idx) => (
            <li key={idx} className="text-sm text-[#292524] leading-relaxed pl-1">
              {renderInlineSegments(itemText, onNavigateSection)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered Lists (1. , 2. , etc.)
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ''));
        i++;
      }
      blocks.push(
        <ol
          key={`ol_${blockKey++}`}
          className="my-2.5 space-y-1.5 pl-5 list-decimal marker:font-mono marker:text-xs marker:font-semibold marker:text-[#14532D]"
        >
          {items.map((itemText, idx) => (
            <li key={idx} className="text-sm text-[#292524] leading-relaxed pl-1">
              {renderInlineSegments(itemText, onNavigateSection)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Standard Paragraph (collect consecutive plain lines)
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !/^(#{1,3})\s+/.test(lines[i].trim()) &&
      !/^([-*•])\s+/.test(lines[i].trim()) &&
      !/^\d+[.)]\s+/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    blocks.push(
      <p key={`p_${blockKey++}`} className="my-2 first:mt-0 last:mb-0 text-sm text-[#292524] leading-relaxed">
        {renderInlineSegments(paragraphLines.join(' '), onNavigateSection)}
      </p>
    );
  }

  return <div className="space-y-1">{blocks}</div>;
};
