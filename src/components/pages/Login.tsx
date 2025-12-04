import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../../management/userlogin";

const Login = () => {
  const { credentials, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex w-screen h-screen items-center justify-center bg-gray-200 background ">
      <div className="border p-14 rounded-2xl bg-white shadow-2xl max-w-xl w-full scale-110 ">
        <h1 className="mb-5 text-3xl font-bold flex items-center justify-center gap-2">
          <span>Login</span>
          <svg
            className="w-8 h-8 text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </h1>
        <hr />
        <br />

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative z-0 w-full mb-7 group">
            <input
              type="text"
              name="username"
              id="username"
              value={credentials.username}
              onChange={handleChange}
              className="block py-3 px-0 w-full text-base text-heading bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="username"
              className="absolute text-base text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 
                peer-focus:start-0 peer-focus:text-blue-600
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Username
            </label>
          </div>

          <div className="relative z-0 w-full mb-20 group">
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="block py-3 px-0 w-full text-base text-heading bg-transparent border-0 border-b-2 border-gray-400 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="password"
              className="absolute text-base text-gray-500 duration-300 transform -translate-y-7 scale-75 top-3 -z-10 
                peer-focus:start-0 peer-focus:text-blue-600
                peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                peer-focus:scale-75 peer-focus:-translate-y-7"
            >
              Password
            </label>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow-lg font-medium rounded text-base px-5 py-3 w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
