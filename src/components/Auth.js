import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { ReactComponent as GoogleSvg } from "../logo googleg 48dp.svg";

import Cookies from "universal-cookie";
import { useRef, useState } from "react";
const cookies = new Cookies();

export const Auth = (props) => {
  const { setIsAuth } = props;
  const auth = getAuth();
  const formRef = useRef();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const singWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    cookies.set("auth-token", result.user.refreshToken);
    setIsAuth(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        cookies.set("auth-token", user.refreshToken);
        setIsAuth(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        showError();
      });
  };

  const showError = () => {
    const errorDiv = document.querySelector(".error-msg");
    console.log(errorDiv);

    errorDiv.style.opacity = "1";
    setTimeout(() => {
      errorDiv.style.opacity = "0";
    }, 3000);
  };

  return (
    <>
      <div className="auth">

       
       
       
       <div className="login">
        <div className="auth-header">
          <h1>Poznaj nowy poziom komunikacji </h1>
          <p>
            Twój komunikator - most łączący serca i umysły, przekraczając
            granice czasu i miejsca, abyśmy zawsze byli razem, gdziekolwiek
            jesteśmy.
          </p>
        </div>

        <div className="login-google">
          <button className="auth-button" onClick={singWithGoogle}>
            <GoogleSvg />
            Zaloguj się z Google
          </button>
        </div>

        <div class="line"></div>

        <div className="login-email">
          <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
            <label>Email:</label>
            <input
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="przykład@przykład.pl"
            ></input>
            <label>Hasło:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="······"
            ></input>
            <button type="submit">Zaloguj</button>
          </form>
          <span>
            Nie masz konta? <Link to="/signup">Zarejestruj się!</Link>{" "}
          </span>
        </div>
       </div>
       
       


        {/* <div className="error-msg">Błędny login lub hasło!</div> */}
      </div>
    </>
  );
};
