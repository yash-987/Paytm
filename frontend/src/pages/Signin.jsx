import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/user";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function Signin() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const setUser = useSetRecoilState(UserAtom);
 const handleLogin = async () => {
    if (!inputs.email || !inputs.password) {
      toast.warning("Please fill all the inputs");
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/user/signin",
        {
          username: inputs.email,
          password: inputs.password,
        },
        config,
      );


      toast.success('Login Success')
      localStorage.setItem("user-info", JSON.stringify(data));
      setUser(data);

      

      
      setTimeout(()=>{
        navigate('/dashboard')
      },800)
      setLoading(false);
    } catch (error) {
      toast.error("Internal server error");

      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in "} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="Enter your email here"
            label="Email"
          />
          <InputBox
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder="Enter your password here"
            label="Password"
          />
          <div className="pt-4">
            <Button
              label={
                loading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                ) : (
                  "Sign In"
                )
              }
              onClick={handleLogin}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" // or "dark"
      />
    </div>
  );
}

export default Signin;
