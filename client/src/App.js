import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';

const socket = io.connect("http://localhost:3001");


function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room",room);
    }
  }

  const sendMessage = () => {
    socket.emit("send_message",{message, room})
  };

  useEffect(()=>{
    socket.on('receive_message',(data)=>{
      setMessageReceived(data.message);
    })
  },[socket])

  
  return (
    <div className="App">
      <input type='text' placeholder='Room Number' onChange={(event)=>{setRoom(event.target.value)}}/>
      <button onClick={joinRoom}>Join Room</button>
      <br/>
      <input type='text' placeholder='Message....' onChange={(event)=>{setMessage(event.target.value)}}/>
      <button onClick={sendMessage}>Send Message</button>
      <h1>{room}</h1>
      <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
