import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";

const initialState = {
  nameRoom: "",
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    nameRoomaction: (state, action) => {
      state.nameRoom = action.payload;
    },
    signoutFromacc: () => {
      signOut(auth);
    },
  },
});

export const { nameRoomaction, signoutFromacc } = roomSlice.actions;
export default roomSlice.reducer;
