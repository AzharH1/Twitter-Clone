import React from "react";
import Sidebar from "../components/Sidebar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

export async function getServerSideProps(context) {
  const id = context.query.id;
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  const tweetData = {
    username: data.username,
    name: data.name,
    photoUrl: data.photoUrl, 
    text: data.tweet,
    tweetImage: data.image || null
  }

  return {
    props: {
      comments: data.comments || null,
      tweetComment: tweetData
    },
  };
}

function PostPage({ comments, tweetComment }) {

  const user = useSelector(state => state.user)
  const router = useRouter();
  return (
    <div>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        <div className="text-white flex-grow border-x border-gray-700 max-w-2xl sm:ml-20 xl:ml-96">
          <div className="py-2 px-3 sticky top-0 z-50 bg-black border-gray-700">
            <div className="flex space-x-3 items-center mb-4">
              <ArrowLeftIcon
                onClick={() => router.back()}
                className="w-7 cursor-pointer"
              />
              <h2 className="text-lg sm:text-xl font-bold">Tweet</h2>
            </div>

            <TweetHeader
              imageUrl={tweetComment?.photoUrl}
              name={tweetComment?.name}
              username={tweetComment?.username}
              tweet={tweetComment.text}
              tweetImageUrl={tweetComment.tweetImage}
            />

            <div className="flex items-center justify-between border-y border-gray-700 p-2">
              <div className="flex justify-center items-center space-x-2 p-1">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={tweetComment?.photoUrl}
                />

                <h1 className="text-gray-500 text-2xl">Tweet your reply</h1>
              </div>

              <button
                // onClick={!user.username ? () => dispatch(openLogInModal()) : sendTweet}
                disabled={true}
                className="rounded-full bg-[#1d9bf0] px-4 py-1.5 shadow-md disabled:opacity-50"
              >
                Reply
              </button>
            </div>

            {comments?.map((comment, i) => {
              return (
                <Comment
                  key={i}
                  imageUrl={comment.photoUrl}
                  name={comment.name}
                  username={comment.username}
                  text={comment.comment}
                />
              );
            })}
          </div>
        </div>

        
      </main>

      {!user.username && (
        <div className="fixed bg-[#1D9BF0] w-full h-[80px] bottom-0 flex justify-center xl:space-x-[200px] items-center">
          <div className="hidden xl:inline">
            <h1 className="text-2xl font-bold">
              Don’t miss what’s happening <br />
            </h1>
            <span className="text-[18px] font-normal">
              People on Twitter are the first to know.
            </span>
          </div>
          <div className="flex space-x-3">
            <LoginModal />
            <SignupModal />
          </div>
        </div>
      )}
    </div>
  );
}

export function TweetHeader({ imageUrl, name, username, tweet, tweetImageUrl }) {
  return (
    <div className="flex space-x-3 p-3">
      <img className="w-12 h-12 rounded-full object-cover" src={imageUrl} />
      <div>
        <div className="flex flex-col space-y-1">
          <h1 className="font-bold">{name}</h1>
          <h1 className="text-gray-500">@{username}</h1>
        </div>
        <p className="mt-2.5 text-2xl">{tweet}</p>

        {tweetImageUrl && (
          <img className="object-cover mt-3 rounded-2-xl  border-gray-700 rounded-md" src={tweetImageUrl} />
        )}
      </div>
    </div>
  );
}

export function Comment({ imageUrl, name, username, text }) {
  return (
    <div className="flex space-x-3 p-3 border-b border-gray-700 ">
      <img className="w-11 h-11 rounded-full object-cover" src={imageUrl} />
      <div>
        <div className="flex space-x-1">
          <h1 className="font-bold">{name}</h1>
          <h1 className="text-gray-500">@{username}</h1>
        </div>
        <p className="mt-2.5">{text}</p>
      </div>
    </div>
  );
}

export default PostPage;
