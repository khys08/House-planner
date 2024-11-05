import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000/'); // Connect to the backend server

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Load stored messages when the client connects
    socket.on('loadMessages', (loadedMessages) => {
      setMessages(loadedMessages);
    });

    // Listen for incoming messages
    socket.on('chatMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('loadMessages');
      socket.off('chatMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('chatMessage', message); // Send message to the server
      setMessage(''); // Clear the input
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '300px', overflowY: 'scroll' }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <strong>{new Date(msg.timestamp).toLocaleTimeString()}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatBox;