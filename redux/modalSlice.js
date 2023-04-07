import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  loginModal: false,
  commentModal: false,
  tweet: {
    id: null,
    tweet: null,
    username: null,
    name: null,
    photoUrl: null,
  },
};

export const counterSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openM: (state) => {
      state.open = true;
    },

    closeM: (state) => {
      state.open = false;
    },
    openLogInModal: (state) => {
      state.loginModal = true;
    },

    closeLogInModal: (state) => {
      state.loginModal = false;
    },

    openCommentModal: (state) => {
      state.commentModal = true;
    },

    closeCommentModal: (state) => {
      state.commentModal = false;
    },

    setTweet : (state, action) => {
        state.tweet.id = action.payload.id,
        state.tweet.tweet = action.payload.tweet,
        state.tweet.username = action.payload.username,
        state.tweet.name = action.payload.name,
        state.tweet.photoUrl = action.payload.photoUrl
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  openM,
  closeM,
  openLogInModal,
  closeLogInModal,
  openCommentModal,
  closeCommentModal,
  setTweet
} = counterSlice.actions;

export default counterSlice.reducer;
