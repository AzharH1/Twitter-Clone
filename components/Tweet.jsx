import {
  ChartBarIcon,
  ChatAltIcon,
  ChatIcon,
  HeartIcon,
  ShareIcon,
  TrashIcon,
  UploadIcon,
} from "@heroicons/react/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/solid";

import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  FieldValue,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import {
  openCommentModal,
  openLogInModal,
  setTweet,
} from "../redux/modalSlice";

function Tweet({ data, id }) {
  const router = useRouter();

  const dispatch = useDispatch();
  const username = useSelector((state) => state.user.username);
  const uid = useSelector((state) => state.user.uid);
  const [liked, setLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "posts", id), (doc) => {
      setTotalLikes(doc.data()?.likes);
    });

    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "posts", id), (doc) => {
      setComments(doc.data()?.comments);
    });

    return unsub;
  }, []);

  async function like(e) {
    e.stopPropagation();
    if (totalLikes.includes(uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(uid),
      });
    }
  }

  async function handleDelete(e) {
    e.stopPropagation();
    await deleteDoc(doc(db, "posts", id));
  }

  return (
    <div
      onClick={() => router.push("/" + id)}
      className="cursor-pointer border-b border-gray-700 p-3 flex space-x-3"
    >
      <img
        src={data.photoUrl}
        className="h-11 w-11 rounded-full cursor-pointer object-cover"
      />
      <div className="w-full">
        <div className="flex space-x-2  items-center">
          <h1 className="font-bold">{data?.name}</h1>
          <h1 className=" text-gray-500">@{data?.username}</h1>

          <div className="w-1 h-1 bg-gray-500 rounded-full"></div>

          <h1 className="text-gray-500 flex justify-center items-center">
            <Moment fromNow>{data?.timestamp?.toDate()}</Moment>
          </h1>
        </div>
        <p className="text-lg mt-1">{data?.tweet}</p>
        {data.image && (
          <img
            className="object-cover mt-3 rounded-2-xl  border-gray-700 rounded-md"
            src={data.image}
          />
        )}

        <div className="flex items-start space-x-14 mt-5 text-gray-500">
          <div
            onClick={
              !username
                ? (e) => {
                    e.stopPropagation();
                    dispatch(openLogInModal());
                  }
                : (e) => {
                    e.stopPropagation();
                    dispatch(
                      setTweet({
                        id: id,
                        username: data.username,
                        name: data.name,
                        tweet: data.tweet,
                        photoUrl: data.photoUrl,
                      })
                    );
                    dispatch(openCommentModal());
                  }
            }
            className="cursor-pointer space-x-2 w-9 h-9 hover:text-green-400 flex items-center justify-center rounded-full transition ease-out"
          >
            <ChatIcon className="w-5" />
            {comments?.length > 0 && <span>{comments.length}</span>}
          </div>
          <div
            onClick={
              !username
                ? (e) => {
                    e.stopPropagation();
                    dispatch(openLogInModal());
                  }
                : like
            }
            className="cursor-pointer space-x-2 w-9 h-9 hover:text-pink-600 hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out"
          >
            {totalLikes.includes(uid) ? (
              <FilledHeart className="w-5 text-pink-500" />
            ) : (
              <HeartIcon className="w-5" />
            )}

            {totalLikes.length > 0 && <span>{totalLikes.length}</span>}
          </div>

          {uid === data.uid && (
            <div
              onClick={handleDelete}
              className="cursor-pointer w-9 h-9 hover:bg-[#d9d9d9] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out"
            >
              <TrashIcon className="w-5" />
            </div>
          )}

          <div className="cursor-pointer w-9 h-9 hover:bg-[#d9d9d9] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
            <ChartBarIcon className="w-5" />
          </div>
          <div className="cursor-pointer w-9 h-9 hover:bg-[#d9d9d9] hover:bg-opacity-10 flex items-center justify-center rounded-full transition ease-out">
            <UploadIcon className="w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
