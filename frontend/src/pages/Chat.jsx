import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { queryAPI } from "../services/api";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import "../styles/Chat.css";

const Chat = () => {
  const { user, logout } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadHistory = async () => {
    try {
      setLoadingHistory(true);
      const response = await queryAPI.getHistory(1, 50);

      const historyMessages = response.data.queries
        .reverse()
        .flatMap((query) => [
          {
            id: `q-${query.id}`,
            type: "question",
            content: query.question,
            timestamp: query.createdAt,
          },
          {
            id: `a-${query.id}`,
            type: "answer",
            content: query.answer,
            references: query.references,
            timestamp: query.createdAt,
          },
        ]);

      setMessages(historyMessages);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleSendMessage = async (question) => {
    const userMessage = {
      id: `temp-q-${Date.now()}`,
      type: "question",
      content: question,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await queryAPI.ask(question);
      const { query } = response.data;

      const aiMessage = {
        id: `a-${query.id}`,
        type: "answer",
        content: query.answer,
        references: query.references,
        timestamp: query.createdAt,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      const errorMessage = {
        id: `error-${Date.now()}`,
        type: "error",
        content:
          err.response?.data?.message ||
          "Failed to get answer. Please try again.",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear all chat history?")) {
      return;
    }

    try {
      await queryAPI.clearHistory();
      setMessages([]);
    } catch (err) {
      alert("Failed to clear history");
      console.error(err);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-content">
          <h1>💬 Ask Questions</h1>
          <div className="header-actions">
            <button
              onClick={handleClearHistory}
              className="btn-secondary btn-sm"
            >
              Clear History
            </button>
            <span className="user-email">{user?.email}</span>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="chat-content">
        <div className="messages-container">
          {loadingHistory ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading chat history...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🤖</div>
              <h2>Start a Conversation</h2>
              <p>Ask questions about your uploaded documents</p>
              <div className="example-questions">
                <p className="example-label">Example questions:</p>
                <ul>
                  <li>"What is the main topic of my documents?"</li>
                  <li>"Summarize the key points"</li>
                  <li>"What does it say about [specific topic]?"</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <ChatInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default Chat;
