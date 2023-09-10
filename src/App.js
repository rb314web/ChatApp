import { useRef, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";

import { Chat } from "./components/Chat";

import { signOut } from "firebase/auth";
import { auth } from "./firebase"

import Cookies from "universal-cookie";
const cookies = new Cookies;

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'));
  const [room, setRoom] = useState(null);

  const roomInputRef = useRef(null);
  
  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  
  const returnToRoomSelect = () => {
    setRoom(null)
  }

  if (!isAuth) {
    return (
      <div className="App">
      <Auth setIsAuth={setIsAuth} />
      </div>

    )
  }


  return (
    <div className="App">
      {room ? (
        <Chat room={room} signUserOut={signUserOut} returnToRoomSelect={returnToRoomSelect}/>
      ) : (
        <div className="room-select">
          <button className="sign-out-app" onClick={signUserOut}>Wyloguj</button>
          <h1>Wpisz nazwę pokoju</h1>
          <input placeholder="Wpisz nazwę pokoju" ref={roomInputRef}></input>
          <button className="room-select-button" onClick={() => setRoom(roomInputRef.current.value)}>
            Zacznij czat
          </button>
        </div>
      )}
    </div>
  );
}

export default App;