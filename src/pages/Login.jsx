import { signInWithPopup } from "firebase/auth";
import Logo from "../assets/chat.svg";
import { auth, googleProvider } from "../config/firebase";
import toast from "react-hot-toast";
import CookieServices from "../service/CookieServices";
function Login() {
  async function Loggedin() {
    try {
      const userAcc = await signInWithPopup(auth, googleProvider);
      console.log(userAcc);
      const date = new Date();
      const DAYS = 3;
      const EXPIRE_IN = 1000 * 60 * 60 * 24 * DAYS;
      date.setTime(date.getTime() + EXPIRE_IN);
      const options = { path: "/", expires: date };
      CookieServices.set("tokenFire", userAcc.user.refreshToken, options);
      toast.success("Login Successfully 👌", {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });
      setTimeout(() => {
        location.replace("/room");
      }, 2000);
    } catch (error) {
      toast.error(`Error Message`, {
        position: "bottom-center",
        duration: 1500,
      });
    }
  }
  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      <div className="md:w-1/4 mx-auto border-[10px] py-2 px-2 pt-0  rounded-2xl border-[#EBF4F3]  ">
        <div className="flex flex-col items-center rounded-2xl space-y-2 ">
          <img src={Logo} alt="logo" loading="lazy" className="w-1/2" />
          <h1 className="text-4xl font-bold">Chat Room</h1>
          <p className="pt-8 font-normal text-lg">Login Your Account</p>
          <div className=" w-full flex justify-center pt-4">
            <button
              onClick={() => Loggedin()}
              className=" text-white bg-[#17B67C] hover:bg-[#17B67C]/90 focus:ring-4 focus:outline-none focus:ring-[#17B67C]/50 font-medium rounded-lg text-lg px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#17B67C]/55 me-2 mb-2"
            >
              <svg
                className="w-5 h-5 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
