import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCounter,
  fetchLogin,
  fetchSignIn,
} from "../redux/actions/actions";

const Home = () => {
  const dispatch = useDispatch();

  const [clickCount, setClickCount] = useState(0);
  const [usernameSignin, setUsernameSignin] = useState("");
  const [usernameLogin, setUsernameLogin] = useState("");
  const [lastClickTime, setLastClickTime] = useState(null);

  //contiene el contador, el nombre y tambien todos la base de datos entera (unicamente los puntos)
  const user = useSelector((state) => state.user);

  //controla el contador local (solo el numerito, no el de redux)
  const handleReset = () => {
    setClickCount(0);
  };

  //aumenta el contador y establece una fecha para el ultimo click
  const handleClick = () => {
    setClickCount(clickCount + 1);

    setLastClickTime(new Date());
  };

  const handleClickWithDelay = () => {
    const currentTime = new Date();
    const timeSinceLastClick = currentTime - lastClickTime;
    console.log("last time since click: " + timeSinceLastClick);

    // Realizar el envío a la base de datos después de 5 segundos y menos de 1 segundo desde el último clic
    if (lastClickTime && timeSinceLastClick >= 5000) {
      setTimeout(() => {
        console.log(clickCount);
        console.log("enviado a la base de datos");

        const data = {
          counter: clickCount,
          userName: user.name,
        };

        dispatch(fetchCounter(data));
        setClickCount(0);
      }, 5000);
    }
  };

  //fetch del formualrio de registro
  const handleSigninform = (event) => {
    event.preventDefault();

    dispatch(fetchSignIn(usernameSignin));

    setUsernameSignin("");
  };

  //fetch del formulario de login
  const handleLoginform = (event) => {
    event.preventDefault();

    dispatch(fetchLogin(usernameLogin));
    setUsernameLogin("");
  };

  //cambia los estados locales
  const handleInput = (event) => {
    setUsernameSignin(event.target.value);
  };

  const handleLogin = (event) => {
    setUsernameLogin(event.target.value);
  };

  return (
    /* display */
    <div className="w-screen flex flex-row">
      <div className="w-1/3 flex h-screen justify-center items-center flex-col border-r-2 border-black">
        <div className="border-2 rounded-md w-[50%] border-blue-500 mb-5">
          <h1 className="text-black font-medium w-full m-2">
            Click Count: {clickCount} local
          </h1>
          <h1 className="text-black font-medium w-full m-2">
            Click Count TOTAL: {user.counter}
          </h1>
          <h1 className="text-black font-medium w-full m-2">
            Username: {user.name}
          </h1>
          <button
            className="border-2  bg-blue-500 text-white font-semibold text-lg p-2 flex mx-auto mt-2 hover:bg-blue-700 transition duration-150 mb-2"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div
          className="border-2 rounded-md w-[50%] h-[40%] border-black"
          onClick={() => {
            handleClick();
            handleClickWithDelay();
          }}
        ></div>
      </div>

      {/* formulario de login */}
      <div className="w-1/3 flex h-screen justify-center items-center flex-col">
        <div className="h-auto border-black border-2 p-4">
          <h1 className="text-black font-semibold text-lg mb-2">Login</h1>
          <form className="flex flex-col">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              className="p-2 border-2 border-black text-black mt-2"
              value={usernameLogin}
              onChange={handleLogin}
              placeholder="Introducir usuario"
              required
            />
            <button
              className="border-2  bg-blue-500 text-white font-semibold text-lg p-2 flex mx-auto mt-10 hover:bg-blue-700 transition duration-150"
              onClick={handleLoginform}
            >
              Sign in
            </button>
          </form>
        </div>
        {/* aca va la tabla */}
        <div className="border-2 border-black h-1/3 mt-2 rounded-sm p-2">
          {user.allCounters &&
            user.allCounters.map((el, index) => (
              <h1
                key={index}
                className="w-full min-w-1/2 h-[2em] text-black font-medium"
              >
                User {index + 1}: {el} Clicks
              </h1>
            ))}
        </div>
      </div>

      {/* formulario de registro */}
      <div className="w-1/3 flex justify-center items-center flex-col border-2 border-black">
        <div className="h-auto border-black border-2 p-4">
          <h1 className="text-black font-semibold text-lg mb-2">Register</h1>
          <form className="flex flex-col">
            <label htmlFor="user">Usuario</label>
            <input
              type="text"
              name="user"
              id="user"
              value={usernameSignin}
              className="p-2 border-2 border-black text-black mt-2"
              required
              onChange={handleInput}
              placeholder="Introducir usuario nuevo"
            />
            <button
              className="border-2  bg-blue-500 text-white font-semibold text-lg p-2 flex mx-auto mt-10 hover:bg-blue-700 transition duration-150"
              onClick={handleSigninform}
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
