import React, { useContext, useState } from 'react';
// if you have react-icons installed, you can also do:
// import { RiArrowRightSLine } from 'react-icons/ri';

import { SocketContext } from '../context/SocketContext';

export default function ChatSidebar(props) {
  const [message, setMessage] = useState('');

  const{socket} = useContext(SocketContext);

  const handleSend = () => {
    if (!message.trim()) return;
    if(props.ride){
        console.log(props.ride,"wefw")
    props.setChatLog(prev => [...prev, { text: message,type:props.type}]);
  if(props.type=="user")  socket.emit('chat',{"text":message,"socketId":props.ride.rental.socketID}); 
  else  socket.emit('chat',{"text":message,"socketId":props.ride.user.socketID}); 
    setMessage('');}
    else alert("no one to chat");
  };

  return (
    <aside className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg flex flex-col">
      <header className="relative p-4 border-b">
        <h2 className="text-xl font-semibold">Chat</h2>
        {/* Close arrow */}
        <button
          onClick={()=>props.setChat(true)}
          aria-label="Close chat"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition"
        >
          {/* using the Remix Icon class name */}
          <i className="ri-arrow-right-s-line text-2xl"></i>
          {/*
          — or with react-icons:
          <RiArrowRightSLine className="text-2xl" />
          */}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {props.chatLog.map((entry, idx) => (
          <div key={idx} className={`${entry.type===props.type?'bg-gray-300':'bg-green-300'} p-2 rounded-lg`}>
            <span className="text-sm text-gray-700">{entry.text}</span>
          </div>
        ))}
      </div>

      <footer className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </footer>
    </aside>
  );
}
