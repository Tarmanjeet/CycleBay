import React, { useState, useEffect } from 'react';
import './Messages.css';
import NavBar from '../../Components/NavBar';

function Messages() {
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    // Mock data for initial development
    useEffect(() => {
        // This will be replaced with actual API calls
        setConversations([
            {
                id: 1,
                user: {
                    name: 'John Doe',
                    avatar: 'https://cdn-icons-png.flaticon.com/128/2102/2102633.png'
                },
                lastMessage: 'Is this bike still available?',
                timestamp: '10:30 AM',
                unread: true
            },
            {
                id: 2,
                user: {
                    name: 'Jane Smith',
                    avatar: 'https://cdn-icons-png.flaticon.com/128/2102/2102633.png'
                },
                lastMessage: 'What\'s the best price you can offer?',
                timestamp: 'Yesterday',
                unread: false
            }
        ]);
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: message,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessage('');
    };

    return (
        <>
            <NavBar />
            <div className="messages-container">
                <div className="messages-sidebar">
                    <div className="messages-header">
                        <h2>Messages</h2>
                    </div>
                    <div className="conversations-list">
                        {conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`conversation-item ${selectedChat === conversation.id ? 'active' : ''}`}
                                onClick={() => setSelectedChat(conversation.id)}
                            >
                                <img src={conversation.user.avatar} alt={conversation.user.name} className="user-avatar" />
                                <div className="conversation-info">
                                    <div className="conversation-header">
                                        <h3>{conversation.user.name}</h3>
                                        <span className="timestamp">{conversation.timestamp}</span>
                                    </div>
                                    <p className="last-message">{conversation.lastMessage}</p>
                                </div>
                                {conversation.unread && <div className="unread-indicator" />}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="messages-main">
                    {selectedChat ? (
                        <>
                            <div className="chat-header">
                                <img src={conversations.find(c => c.id === selectedChat)?.user.avatar} alt="User" className="user-avatar" />
                                <h3>{conversations.find(c => c.id === selectedChat)?.user.name}</h3>
                            </div>
                            <div className="messages-list">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                                        <div className="message-content">
                                            <p>{msg.text}</p>
                                            <span className="message-timestamp">{msg.timestamp}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <form className="message-input-container" onSubmit={handleSendMessage}>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="message-input"
                                />
                                <button type="submit" className="send-button">
                                    <img src="https://cdn-icons-png.flaticon.com/128/2983/2983788.png" alt="Send" />
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="no-chat-selected">
                            <img src="https://cdn-icons-png.flaticon.com/128/134/134909.png" alt="Messages" />
                            <h2>Select a conversation to start messaging</h2>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Messages; 