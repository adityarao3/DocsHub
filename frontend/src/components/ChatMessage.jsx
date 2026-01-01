import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import "highlight.js/styles/github-dark.css";

const ChatMessage = ({ message }) => {
  const [copiedCode, setCopiedCode] = useState(null);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  if (message.type === "question") {
    return (
      <div className="message message-question">
        <div className="message-content">
          <div className="message-bubble user-bubble">
            <p>{message.content}</p>
          </div>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  if (message.type === "answer") {
    return (
      <div className="message message-answer">
        <div className="message-avatar">🤖</div>
        <div className="message-content">
          <div className="message-bubble ai-bubble">
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    const codeIndex =
                      node?.position?.start?.line || Math.random();

                    return !inline ? (
                      <div className="code-block-wrapper">
                        <div className="code-header">
                          {match && (
                            <div className="code-language">{match[1]}</div>
                          )}
                          <button
                            className="copy-button"
                            onClick={() =>
                              copyToClipboard(codeString, codeIndex)
                            }
                            title="Copy code"
                          >
                            {copiedCode === codeIndex ? (
                              <span>✓ Copied!</span>
                            ) : (
                              <span>📋 Copy</span>
                            )}
                          </button>
                        </div>
                        <pre className={className}>
                          <code className={className} {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    ) : (
                      <code className="inline-code" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <p className="markdown-paragraph">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="markdown-list">{children}</ul>;
                  },
                  ol({ children }) {
                    return (
                      <ol className="markdown-list markdown-ordered-list">
                        {children}
                      </ol>
                    );
                  },
                  li({ children }) {
                    return <li className="markdown-list-item">{children}</li>;
                  },
                  h1({ children }) {
                    return <h1 className="markdown-h1">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="markdown-h2">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="markdown-h3">{children}</h3>;
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className="markdown-blockquote">
                        {children}
                      </blockquote>
                    );
                  },
                  table({ children }) {
                    return <table className="markdown-table">{children}</table>;
                  },
                  a({ href, children }) {
                    return (
                      <a
                        href={href}
                        className="markdown-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>

            {message.references && message.references.length > 0 && (
              <div className="references">
                <p className="references-title">📚 Sources:</p>
                <ul className="references-list">
                  {message.references.map((ref, index) => (
                    <li key={index} className="reference-item">
                      <strong>{ref.documentName}</strong>
                      <p className="reference-excerpt">"{ref.excerpt}"</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  if (message.type === "error") {
    return (
      <div className="message message-error">
        <div className="message-content">
          <div className="message-bubble error-bubble">
            <p>⚠️ {message.content}</p>
          </div>
          <span className="message-time">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default ChatMessage;
