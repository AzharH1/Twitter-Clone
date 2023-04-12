import React, { useEffect, useState } from "react";
import TweetInput from "../components/TweetInput";
import Tweet from "../components/Tweet";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import CommentModal from "./CommentModal";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";

function Feed() {
  const [tweets, setTweets] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setTweets(snapshot.docs);
    });

    return unsub;
  }, []);

  return (
    <div className="text-white flex-grow border-x border-gray-700 max-w-2xl sm:ml-20 xl:ml-96">
      <div className="py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
      </div>
      <TweetInput />

      <div className="pb-36">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} data={tweet.data()} id={tweet.id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
