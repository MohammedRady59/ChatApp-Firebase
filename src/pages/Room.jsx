import { Bell } from "lucide-react";
import Logo from "../assets/chat.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  nameRoomaction,
  signoutFromacc,
} from "../redux/feature/Room/roomSlice";
import CookieServices from "../service/CookieServices";

function Room() {
  const [roomName, setRoomname] = useState("");
  const { nameRoom } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  console.log(nameRoom);

  const navgite = useNavigate();
  async function handleRoom(e) {
    e.preventDefault();
    if (roomName === "") return;
    await dispatch(nameRoomaction(roomName));
    navgite("/chat");
  }
  function logout() {
    CookieServices.remove("tokenFire");
    dispatch(signoutFromacc());
    location.replace("/");
  }
  return (
    <div className=" w-full h-screen flex items-center justify-center relative  ">
      <div className="absolute right-0 md:top-1/4 top-4 m-4 ">
        <button
          onClick={() => logout()}
          type="button"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none  "
        >
          Sign Out
        </button>
      </div>

      <div className="md:w-1/4 mx-auto border-[10px] py-2 pt-0 px-2  rounded-2xl border-[#EBF4F3]  ">
        <div className="flex  items-center rounded-2xl md:justify-between justify-center p-2 flex-wrap ">
          <img src={Logo} alt="logo" loading="lazy" className="w-1/6" />
          <h1 className="md:text-xl font-bold uppercase">Chat Room</h1>
          <span className="p-2 border-[#EBF4F3] flex justify-center items-center border-2 rounded-lg ">
            <Bell />
          </span>
        </div>
        <div className="pt-10 border-t-2 border-[#17B67C]">
          <form className="max-w-sm mx-auto" onSubmit={(e) => handleRoom(e)}>
            <label
              htmlFor="website-admin"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Enter Room
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md ">
                <svg
                  className="w-4 h-4 text-gray-500 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </span>
              <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomname(e.target.value)}
                id="website-admin"
                className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 "
                placeholder="Enter Room Name"
              />
            </div>
            <button className="text-white bg-[#17B67C] hover:bg-[#17B67C] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2 mt-4 w-full ">
              Enter Room
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Room;
