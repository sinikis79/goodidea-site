import type { CSSProperties } from "react";

type TypingTextProps = {
  text: string;
  className?: string;
  charDelayMs?: number;
  startDelayMs?: number;
  lineBreakPauseMs?: number;
};

export default function TypingText({
  text,
  className = "",
  charDelayMs = 150,
  startDelayMs = 450,
  lineBreakPauseMs = 750,
}: TypingTextProps) {
  let charCount = 0;
  let extraPause = 0;
  const charData = Array.from(text).map((char) => {
    if (char === "\n") {
      extraPause += lineBreakPauseMs;
      return { char, isBreak: true, delay: 0 };
    }
    const delay = startDelayMs + charCount * charDelayMs + extraPause;
    charCount++;
    return { char, isBreak: false, delay };
  });

  const lastDelay =
    charData.filter((d) => !d.isBreak).at(-1)?.delay ?? startDelayMs;
  const cursorDelay = lastDelay + charDelayMs;

  return (
    <span
      aria-label={text}
      className={["whitespace-pre-line", className].filter(Boolean).join(" ")}
      role="text"
    >
      <style>{`
        @keyframes typing-char-reveal {
          from {
            opacity: 0;
            filter: blur(2px);
            transform: translateY(0.16em);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes cursor-appear {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes cursor-blink {
          0%, 100% { opacity: 1;    }
          50%      { opacity: 0.12; }
        }

        .typing-char {
          display: inline-block;
          opacity: 0;
          animation: typing-char-reveal 1200ms cubic-bezier(0.19, 1, 0.22, 1) forwards;
          animation-delay: var(--typing-delay);
        }

        .typing-cursor {
          display: inline-block;
          opacity: 0;
          animation:
            cursor-appear 250ms ease-out var(--cursor-delay) forwards,
            cursor-blink 1200ms ease-in-out calc(var(--cursor-delay) + 250ms) infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .typing-char {
            opacity: 1;
            filter: none;
            transform: none;
            animation: none;
          }
          .typing-cursor {
            opacity: 1;
            animation: cursor-blink 1200ms ease-in-out infinite;
          }
        }
      `}</style>
      {charData.map(({ char, isBreak, delay }, index) => {
        if (isBreak) {
          return <br aria-hidden="true" key={`line-break-${index}`} />;
        }

        return (
          <span
            aria-hidden="true"
            className="typing-char"
            key={`${char}-${index}`}
            style={
              {
                "--typing-delay": `${delay}ms`,
              } as CSSProperties
            }
          >
            {char === " " ? " " : char}
          </span>
        );
      })}
      <span
        aria-hidden="true"
        className="typing-cursor"
        style={{ "--cursor-delay": `${cursorDelay}ms` } as CSSProperties}
      >
        _
      </span>
    </span>
  );
}
