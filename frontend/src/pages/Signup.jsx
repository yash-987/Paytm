import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserAtom } from "../store/user";
import { Toast } from "../components/Toast";
function Signup() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });
  const setUser = useSetRecoilState(UserAtom);
  const navigate = useNavigate();
  async function handleSignup() {
    if (
      !inputs.firstName ||
      !inputs.lastName ||
      !inputs.username ||
      !inputs.password
    ) {
   console.log('please fill all the inputs') 
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      console.log("before api hit");
      const { data } = await axios.post(
        "/api/v1/user/signup",
        {
          firstName: inputs.firstName,
          lastName: inputs.lastName,
          username: inputs.username,
          password: inputs.password,
        },
        config,
      );

      localStorage.setItem("user-info", JSON.stringify(data));
      setUser(data);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            value={inputs.firstName || ""}
            onChange={(e) =>
              setInputs({ ...inputs, firstName: e.target.value })
            }
            placeholder={"John"}
            label={"First Name"}
          />
          <InputBox
            value={inputs.lastName}
            onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
            placeholder={"Doe"}
            label={"Last Name"}
          />
          <InputBox
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            placeholder={"yash@gmail.com"}
            label={"Email"}
          />
          <InputBox
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder={"Enter your password"}
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={() => handleSignup()} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in "}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
