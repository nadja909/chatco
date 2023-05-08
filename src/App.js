import React from 'react';
import {useEffect, useState} from 'react';
import Messages from "./Messages";
import './App.css';
import Input from './Input';

function randomName() {
  const userName = ["Brightstar", "Radix", "Raise", "Fareast", "Starlight", "Lumina", "Conquest", "Wildcard", "Integra", "Component", "Seismic", "Presence", "Vinci", "Veritas", "Pantheon", "Emerald", "Greenfield", "Afterhours", "Silkroad", "Roman", "Futura", "Allure", "Skynet", "Redstone", "Townsend", "Toucan", "Valiant", "Ambiance", "Panther", "Offroad", "Candor", "Upstart", "Techniq", "Enigma", "Hexagon", "Mantis", "Ariel", "Pegasus", "Voltage", "Mayflower", "Optimum", "Nirvanous", "Condor", "Fortis", "Mohawk", "Blend", "Juniper", "Ceaser", "Arden", "Capitol", "Seacoast", "Mogul", "Element", "Allstar", "Cadence", "Magma", "Bluestar", "Stylus", "Canyon", "Sycamore", "Mantra", "Apache", "Insignia", "Fireside", "Myriad", "Chord", "Cabana", "Tandem", "Emergie", "Sunburst", "Apogee", "Andes", "Anvil", "Axion", "Capstone", "Diggi"];
  return userName[Math.floor(Math.random() * userName.length)];
  }
  
function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

function App() {
  const [member, setMember] = useState({
    username: randomName(),
    color: randomColor(),
  });
  const [messages, setMessages] = useState([]);
  const [drone, setDrone] = useState();

  useEffect(() => {
      const drone = new window.Scaledrone('rj35Nn3PfK4cvCbJ', {
      data: member,
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      member.id = drone.clientId;
      setMember(member);
    });

    const room = drone.subscribe("observable-room");

    room.on("message", (message) => {
      setMessages((prevState) => [...prevState, message]);
    });

    setDrone(drone);
  }, []);

  const onSendMessage = (message) => {
    drone.publish({
      room: "observable-room",
      message,
    });
  };


  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Chat.co</h1>
        <h3>Your secure space where encryption kicks in</h3>
      </div>
      <Messages messages={messages} currentMember={member} />
      <Input onSendMessage={onSendMessage} />
    </div>
   );
}

export default App;