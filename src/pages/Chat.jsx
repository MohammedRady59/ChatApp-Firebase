import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { EllipsisVertical, MoveLeft, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signoutFromacc } from "../redux/feature/Room/roomSlice";
import CookieServices from "../service/CookieServices";

function Chat() {
  const { nameRoom: roomFromRedux } = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const [newMessage, setMessage] = useState("");
  const [messagesApp, setMessages] = useState([]);
  const navgite = useNavigate();

  const currentUser = auth.currentUser?.displayName;
  const msgModel = collection(db, "Message");

  const nameRoom = localStorage.getItem("currentRoom") || roomFromRedux;

  function logout() {
    CookieServices.remove("tokenFire");
    dispatch(signoutFromacc());
    location.replace("/");
    localStorage.removeItem("currentRoom");
  }
  useEffect(() => {
    localStorage.setItem("currentRoom", nameRoom);

    const queryMsg = query(msgModel, where("room", "==", nameRoom));
    const subcribe = onSnapshot(queryMsg, (snapshot) => {
      let messages = [];
      snapshot.forEach((el) => {
        messages.push({ ...el.data(), id: el.id });
      });
      messages.sort(
        (a, b) =>
          (a.createAt ? a.createAt.seconds : 0) -
          (b.createAt ? b.createAt.seconds : 0)
      );

      setMessages(messages);
    });
    return () => subcribe();
  }, []);
  async function handelChat(e) {
    e.preventDefault();
    console.log(newMessage);
    if (newMessage === "") return;
    await addDoc(msgModel, {
      text: newMessage,
      createAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: nameRoom,
    });
    setMessage("");
  }
  return (
    <>
      <div className=" w-full h-screen flex items-center justify-center relative ">
        <div className="absolute right-0 md:top-1/4 top-0 m-4 ">
          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none "
          >
            Sign Out
          </button>
        </div>
        <div className="w-3/4 mx-auto border-[10px] py-2 pt-0 px-2 rounded-2xl border-[#EBF4F3]  ">
          <div className="flex  items-center rounded-2xl justify-between  p-2 flex-wrap ">
            <span
              className="cursor-pointer"
              onClick={() => {
                navgite(-1);
                localStorage.removeItem("currentRoom");
              }}
            >
              {" "}
              <MoveLeft />
            </span>
            <h2 className="font-medium md:text-xl text-center ">{nameRoom}</h2>
            <EllipsisVertical />
          </div>
          <div className="overflow-y-auto max-h-96">
            {messagesApp.map((el) => (
              <div
                key={el.id}
                className={`flex ${
                  el.user === currentUser ? "justify-end" : "justify-start"
                } my-2`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    el.user === currentUser
                      ? "bg-[#17B67C] rounded-br-[0] rounded-2xl text-white font-medium"
                      : "bg-gray-200 rounded-bl-[0] rounded-2xl"
                  }`}
                >
                  <span className="font-semibold">{el.user}</span>
                  <p>{el.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-10 ">
            <form className="w-full mx-auto" onSubmit={(e) => handelChat(e)}>
              <div className="relative">
                <button className="absolute inset-y-0 right-0 flex items-center pr-3.5  cursor-pointer">
                  <Send color="#17B67C" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setMessage(e.target.value)}
                  id="email-address-icon"
                  className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-10 p-2.5  "
                  placeholder="Write Message..."
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
