import {
  CalculatorIcon,
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/solid";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db, storage } from "../firebase";
import { openLogInModal } from "../redux/modalSlice";

function TweetInput() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const pickFileRef = useRef(null);


  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  async function sendTweet(){
    setLoading(true)

    const docRef = await addDoc(collection(db, "posts"), {
      username: user.username,
      uid: user.uid,
      photoUrl: user.photoUrl,
      tweet: tweet,
      name: user.name,
      likes: [],
      timestamp: serverTimestamp()
    })

    
    if (selectedImage){
      const imageRef = ref(storage, `postImages/${docRef.id}`)
      const uploadImage = await uploadString(imageRef, selectedImage, "data_url")
      const downloadURL = await getDownloadURL(imageRef)
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL
      })

    }

    setTweet("")
    setSelectedImage(null)
    setLoading(false)

  }

  function addImagetoTweet(e){
    const reader = new FileReader()
    if (e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])

    }

    reader.addEventListener("load", e => {
      setSelectedImage(e.target.result)
    })

  }

  return (
    <div className="border-b border-gray-700 p-3 flex space-x-3">
      <img
        src={user.photoUrl || "./assets/twitter-logo.png"}
        className="h-11 w-11 object-cover rounded-full cursor-pointer"
      />

      {loading && <h1 className="text-2xl text-gray-500" >Uplaoding post...</h1>}

      {!loading && <div className="w-full">
        <div className="">
          <textarea
            value={tweet}
            className="bg-transparent outline-none w-full min-h-[50px] resize-none text-lg"
            placeholder="What's on your mind?"
            onChange={(e)=> setTweet(e.target.value)}
          />

          {/* Selecting Image */}

          {selectedImage && (
            <div className="relative bg-black mb-4">
              <div
               onClick={() => setSelectedImage(null)}
               className="absolute bg-[#272c26] rounded-full w-8 h-8 flex justify-center items-center top-1 left-1 cursor-pointer">
                <XIcon className="h-5 text-white" />
              </div>
              <img
                src={selectedImage}
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        {/* Icons div */}

        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <div className="flex space-x-0">
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <PhotographIcon
                onClick={() => pickFileRef.current.click()}
                className="h-[22px] text-[#1d9bf0]"
              />
              <input
              onChange={addImagetoTweet}
              ref={pickFileRef} hidden type="file" />
            </div>

            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
            <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
              <LocationMarkerIcon className="h-[22px] text-[#1d9bf0]" />
            </div>
          </div>

          <button
            onClick={!user.username ? () => dispatch(openLogInModal()) : sendTweet}
            disabled={!selectedImage && !tweet}
            className="rounded-full bg-[#1d9bf0] px-4 py-1.5 shadow-md disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </div>
      }
    </div>
  );
}

export default TweetInput;
