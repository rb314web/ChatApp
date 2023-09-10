import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  collectionGroup,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { ReactComponent as SendSvg } from '../send.svg'

export const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesRef = collection(db, "messages");

  const { room, signUserOut, returnToRoomSelect } = props;

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        console.log(messages);
        setMessages(messages);
      });


  }, []);

  useEffect(() => {
    var myElement = document.querySelector('.message:nth-last-child(1)');
    var topPos = myElement && myElement.offsetTop;

    document.querySelector('.messages').scrollTop = topPos;


    setNewMessage('')
    document.querySelector('.new-message-input').focus()
    document.querySelector('.messages').scrollTop = topPos;
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") {

      document.querySelector('.new-message-input ').style.border = '1px solid red'
      setTimeout( () => {
        
        document.querySelector('.new-message-input ').style.border = '1px solid #aeaeae'
        document.querySelector('.new-message-input').focus()
      }, 1000)
      return

    }

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    var myElement = document.querySelector('.message:nth-last-child(1)');
    var topPos = myElement.offsetTop;

    document.querySelector('.messages').scrollTop = topPos;


    setNewMessage('')
    document.querySelector('.new-message-input').focus()
    document.querySelector('.messages').scrollTop = topPos;
  };

  return (
    <div className="chat-app">
        <button className="sign-out-chat" onClick={signUserOut}>Wyloguj</button>
        <button className="room-out-chat" onClick={returnToRoomSelect}>Wyjdź z pokoju</button>
      <div className="header">
        <h1>Witaj w pokoju {room.toUpperCase()}!</h1>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message slide-in-left">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>

      {!messages.length && (
        
        <div className="empty-room">Brak wiadomości w pokoju.</div>
      )}   

    



      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          value={newMessage}
          placeholder="Wpisz wiadomość"
          onChange={(e) => setNewMessage(e.target.value)}
          className="new-message-input"
        />
        <button type="submit" className="send-button">
          <SendSvg/>
        </button>
      </form>

      
    </div>
  );
};
