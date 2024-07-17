"use client";

import { useState } from 'react';

const Home = () => {
  const [messages, setMessages] = useState([
    {
      "role": "chatbot",
      "message": "Hi, ask me anything."
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async () => {
    try {
      const response = await fetch('/api/bedrock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            message: inputMessage
          }
        ),
      });
      
      if (response.ok) {
        const data = await response.text();

        setMessages([...messages, { role: 'user', message: inputMessage }, { role: 'chatbot', message: data }]);
      } else {
        console.error('Error sending message to API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setInputMessage('');
  };

  return (
    <main className='w-full h-full'>

    <div className="container mx-auto p-4">
      <div className="border rounded-lg p-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start gap-2.5">
          <img className="w-8 h-8 rounded-full" src={(msg.role === 'chatbot') ? "https://ui-avatars.com/api/?name=Bedrock" : "https://ui-avatars.com/api/?name=User"} alt={msg.role} />
          <div className="flex flex-col w-full max-w-[320px] leading-1.5">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{msg.role}</span>
              </div>
              <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">{msg.message}</p>
          </div>
          </div>
        ))}
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="border rounded p-2 w-full"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded p-2 mt-2"
        >
          Send
        </button>
      </div>
    </div>
    </main>
  );
};


export default Home;