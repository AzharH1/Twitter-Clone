import React, { useState } from "react";
import Modal from "@mui/material/Modal";

import { useSelector, useDispatch } from "react-redux";
import { openLogInModal, closeLogInModal } from "../redux/modalSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handelSignIn() {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  }

  let modalOpen = useSelector((state) => state.open.loginModal);
  const dispatch = useDispatch();
  return (
    <div>
      <button
        onClick={() => dispatch(openLogInModal())}
        className="bg-transparent text-black 
        border border-white text-white
        w-[160px] h-[40px] xl:w-[110px] xl:h-[42px]
        rounded-full  text-lg font-bold
        mt-auto hover:bg-[#cbd2d7] cursor-pointer
        "
      >
        Log In
      </button>

      <Modal
        open={modalOpen}
        onClose={() => dispatch(closeLogInModal())}
        className="flex justify-center items-center"
      >
        <div className="border text-white rounded-lg border-gray-700 w-[90%] h-fit bg-black md:w-[560px] md:h-[600px] flex flex-col justify-center items-center p-10">
          <div className="h-full w-[90%] text-white">
            <h1 className="text-4xl font-bold">Sign In to your account</h1>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-8 w-full h-10 rounded-md bg-transparent border p-6 border-gray-700"
              type={"email"}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="mt-8 w-full h-10 rounded-md bg-transparent border p-6 border-gray-700"
              type={"password"}
            />
            <button
              onClick={handelSignIn}
              className="bg-white text-black 
        rounded-md w-full p-2 mt-8 text-lg font-bold
        "
            >
              Sign In
            </button>

            <h1 className="text-center font-bold my-8">or</h1>
            <button
              className="bg-white text-black 
              rounded-md w-full p-2 mt-4 text-lg font-bold
              "
            >
              Sign In as Guest
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LoginModal;
