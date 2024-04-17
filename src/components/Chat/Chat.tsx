import React, { useState, useRef, useEffect } from 'react';
import './Chat.css';

const Chat = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`chat-container ${isOpen ? 'open' : 'closed'}`}>
      <button className="toggle-button" onClick={toggleChat}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <>
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${index % 2 === 0 ? 'ai-message' : ''}`}
                style={{ width: `${getMessageWidth(message)}px` }}
              >
                {message}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="input-field"
            />
            <button onClick={handleSendMessage} className="send-button">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Function to calculate width of message based on text length
const getMessageWidth = (text: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = '14px Arial'; // You can adjust the font size here
    const width = context.measureText(text).width;
    return width + 10; // Adding some padding
  }
  return 200; // Default width
};

export default Chat;