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

function Signin() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const setUser = useSetRecoilState(UserAtom);
  const handleLogin = async () => {
    if (!inputs.email || !inputs.password) {
      console.log("Please fill all the fields");
      return;
    }

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

      localStorage.setItem('user-info',JSON.stringify(data));
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
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
            <Button label={"Sign in "} onClick={handleLogin} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
