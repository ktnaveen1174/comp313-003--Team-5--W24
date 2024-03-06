import React, { useState, useEffect } from 'react';
import chatbotLogo from '../../src/assets/chatbotlogo.png';
import '../styles/ChatbotComponent.css';

const Chatbot = ({ message }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
   
    if (message) {
      setMessages(prevMessages => [
        ...prevMessages,
        { text: `${message}, What are your symptoms?`, type: 'bot' }
      ]);
    }
  }, [message]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (userInput.trim() !== '') {
      // Add user message to chat history
      setMessages(prevMessages => [
        ...prevMessages,
        { text: userInput, type: 'user' }
      ]);
      // Clear input field after sending message
      setUserInput('');
      // Here you can add logic to send user message to chatbot and receive response
      // For now, we are just adding a dummy bot response
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'example bot response', type: 'bot' }
        ]);
      }, 500);
    }
  };

  return (
    <div className="chatbot">
      <img
        className="chatbot-image"
        src={chatbotLogo}
        alt="Chatbot Logo"
        onClick={toggleChatbot}
      />
      
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h6>Team 5's Chatbot</h6>
          </div>
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div className={`chatbot-message ${msg.type}`} key={index}>
                <span className="message-sender">{msg.type === 'user' ? 'You:' : 'Bot:'} </span>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={userInput}
                onChange={handleUserInput}
                placeholder="Type your message..."
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
