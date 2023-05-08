import React from 'react';
import {useState} from 'react';

function Input(props) {
    const [text, setText] = useState('');
  
    function onChange(e) {
      setText(e.target.value);
    }

    function onSubmit(e) {
      e.preventDefault();
      setText('');
      props.onSendMessage(text);
    }


    return (
        <div className="Input">
        <form onSubmit={onSubmit}>
            <input
            onChange={onChange}
            value={text}
            type="text"
            placeholder="Write your message and press Enter or click Send"
            autofocus="true"
            />
            <button>Send</button>
        </form>
        </div>
    );

  }

export default Input;