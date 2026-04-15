import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post( BACKEND_URL + "/api/v1/signin" , {
      username,
      password
    })
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);

    //redirect user to dashboard
    navigate("/");
  }


  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded min-w-48 p-8 shadow-md">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="mt-4 flex justify-center">
          <Button
            variant="primary"
            size="md"
            text="Sign in"
            onClick={signin}
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
};
