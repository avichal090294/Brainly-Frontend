import React from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URL}` + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("You've signed up!");
  };

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 p-8 shadow-md">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="mt-4 flex justify-center">
          <Button
            variant="primary"
            size="md"
            text="Sign up"
            onClick={signup}
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};
