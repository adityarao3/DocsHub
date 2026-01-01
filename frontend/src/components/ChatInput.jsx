import { useState } from 'react';

const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-container">
      <div className="input-wrapper">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about your documents..."
          disabled={disabled}
          rows={1}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={!input.trim() || disabled}
          className="btn-send"
          title="Send message"
        >
          {disabled ? '⏳' : '📤'}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
