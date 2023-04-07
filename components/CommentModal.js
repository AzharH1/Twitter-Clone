import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { openCommentModal, closeCommentModal } from "../redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";

function CommentModal({ data }) {
  let modalOpen = useSelector((state) => state.open.commentModal);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const user = useSelector((state) => state.user);
  const router = useRouter();

  async function handleComment() {
    const docRef = await doc(db, "posts", data.id);
    const commentDetails = {
      username: user.username,
      name: user.name,
      photoUrl: user.photoUrl,
      comment: comment,
    };
    await updateDoc(docRef, {
      comments: arrayUnion(commentDetails),
    });

    setComment("");
    dispatch(closeCommentModal())
    router.push("/" + data.id)
  }

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={() => dispatch(closeCommentModal())}
        className="flex justify-center items-center"
      >
        <div className="p-4 relative border h-full w-full text-white rounded-lg border-gray-700 bg-black sm:w-[600px] sm:h-[386px] sm:p-10">
          <div className="w-[2px] h-[110px] bg-gray-500 absolute ml-6 mt-10 z-0"></div>
          <div
            onClick={() => dispatch(closeCommentModal())}
            className="absolute xl:top-4 cursor-pointer"
          >
            <XIcon className="w-6" />
          </div>

          <div className="mt-9">
            <div className="flex space-x-3 w-full">
              <img
                src={data.photoUrl}
                className="rounded-full w-12 h-12 object-cover z-10"
              />
              <div>
                <div className="flex space-x-1.5 ">
                  <h1 className="font-bold">{data.name}</h1>
                  <h1 className="text-gray-500 text-md">@{data.username}</h1>
                </div>
                <p className="mt-1">{data.tweet}</p>
                <h1 className="text-gray-500 text-[15px] mt-2">
                  Replying to{" "}
                  <span className="text-[#1B9BF0]">@{data.username}</span>{" "}
                </h1>
              </div>
            </div>
            <div className="flex mt-11 space-x-3">
              <img
                src={data.photoUrl}
                className="rounded-full w-12 h-12 object-cover z-10"
              />
              <div>
                <textarea
                  className="bg-transparent outline-none w-[400px] xl:w-[420px] xl:min-h-[50px] resize-none text-lg"
                  placeholder="Tweet your reply"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                  <div className="flex space-x-0">
                    <div className="cursor-pointer w-9 h-9 hover:bg-[#1d9bf0] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
                      <PhotographIcon
                        // onClick={() => pickFileRef.current.click()}
                        className="h-[22px] text-[#1d9bf0]"
                      />
                      {/* <input
              // onChange={addImagetoTweet}
              ref={pickFileRef} hidden type="file" /> */}
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
                    onClick={handleComment}
                    disabled={!comment}
                    className="rounded-full bg-[#1d9bf0] px-4 py-1.5 shadow-md disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CommentModal;
