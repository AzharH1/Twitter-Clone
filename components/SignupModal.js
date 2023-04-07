import React from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { openM, closeM } from "../redux/modalSlice";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState, useEffect } from "react";
import { setUser } from "../redux/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { setDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useRouter } from "next/router";

function SignupModal() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);

  const router = useRouter()

  async function handleSignup() {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: `./assets/profilePictures/pfp${Math.ceil(Math.random() * 6)}.png`
    })

    router.reload()

  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return
      console.log(currentUser)
      dispatch(
        setUser({
          name: currentUser?.displayName,
          username: currentUser?.email.split("@")[0],
          email: currentUser?.email,
          uid: currentUser?.uid,
          photoUrl: currentUser?.photoURL,
        })
      );
    });

    return unsub;
  }, []);

  let modalOpen = useSelector((state) => state.open.open);
  return (
    <div>
      <button
        onClick={() => dispatch(openM())}
        className="bg-white text-black 
        border border-white 
        rounded-full w-[160px] h-[40px] xl:w-[110px] xl:h-[42px] text-lg font-bold
        mt-auto hover:bg-[#cbd2d7] cursor-pointer
        "
      >
        Sign Up
      </button>

      <Modal
        open={modalOpen}
        onClose={() => dispatch(closeM())}
        className="flex justify-center items-center"
      >
        <div className="border text-white rounded-lg border-gray-700 w-[90%] h-fit bg-black md:w-[560px] md:h-[600px] flex flex-col justify-center items-center p-10">
          <div className="h-full w-[90%] text-white">
            <button
              className="bg-white text-black 
              rounded-md w-full p-2 mt-8 text-lg font-bold
              "
            >
              Sign In as Guest
            </button>
            {username && <h1>{username}</h1>}
            <h1 className="text-center font-bold my-3">or</h1>
            <h1 className="text-4xl font-bold">Create your account</h1>
            <input
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
              className="mt-8 w-full h-10 rounded-md bg-transparent border p-6 border-gray-700"
              type={"text"}
            />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
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
              onClick={handleSignup}
              className="bg-white text-black 
        rounded-md w-full p-2 mt-8 text-lg font-bold
        "
            >
              Create account
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignupModal;
