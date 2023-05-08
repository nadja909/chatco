import React from "react";
import {useRef, useEffect} from 'react';

function Messages ({messages, currentMember}) {
    const viewBottom= useRef(null);

useEffect(() => {
    viewBottom.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);

function renderMessage(message) {
    const {member, data} = message;
    const viewMyMessage = member.id === currentMember.id;
    const className = viewMyMessage 
    ?"Messages-message currentMember" : "Messages-message";
    return (
        <li className={className} key={Math.random()}>
          <span
            className="avatar"
            style={{backgroundColor: member.clientData.color}}
          />
          <div className="Message-content">
            <div className="username">{member.clientData.username}</div>
            <div className="data"  ref={viewBottom}>{data}</div>
          </div>
        </li>
      );
    }

    return (
        <ul className='Messages-list'>{messages.map((m) => renderMessage(m))}</ul>
      );
}

export default Messages;