import { configureStore } from "@reduxjs/toolkit";
import roomReducer from "./feature/Room/roomSlice";
const store = configureStore({
  reducer: {
    room: roomReducer,
  },
});

export default store;
