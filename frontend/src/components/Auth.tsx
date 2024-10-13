import { SignupInputType } from "@pranavtartey/medium-common-zod";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInputType>({
    username: "",
    password: "",
    name: "",
  });

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(`${name} : ${value}`);
    setPostInputs((prevState: SignupInputType) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clickHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${
          type === "signup" ? "signup" : "signin"
        }`,
        postInputs,
        { withCredentials: true }
      );
      console.log("This is your response : ", response);
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
      console.log("This is your axios response : ", response);
    } catch (error: any) {
      console.log(
        "Something went wrong in the Auth.jsx clickHandler : ",
        error
      );
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2">
        <h1 className="text-3xl cursor-default font-bold text-center">
          {type === "signup" ? "Create an account" : "Login"}
        </h1>
        <p className="text-center cursor-default text-slate-400">
          {type === "signup"
            ? "Already have an account? "
            : "Don't have an account?"}{" "}
          <Link
            className="hover:underline hover:text-slate-800 hover:font-semibold duration-100"
            to={type === "signup" ? "/signin" : "/signup"}
          >
            {type === "signup" ? "Login" : "Signup"}
          </Link>
        </p>
        {type === "signup" && (
          <LabelledInput
            label="name"
            placeholder="name"
            onChange={changeHandler}
            value={postInputs.name}
          />
        )}
        <LabelledInput
          label="username"
          placeholder="username"
          onChange={changeHandler}
          value={postInputs.username}
        />
        <LabelledInput
          label="password"
          placeholder="password"
          onChange={changeHandler}
          value={postInputs.password}
          type="password"
        />
        <button
          onClick={clickHandler}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mt-2 w-full"
        >
          {type === "signup" ? "sign up" : "sign in"}
        </button>
      </div>
    </div>
  );
};

type ValueInput = string | undefined;

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: ValueInput;
  type?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  value,
  type,
}: LabelledInputType) => {
  return (
    <div className="mt-4">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-bold text-gray-900"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        id={label}
        name={label}
        onChange={onChange}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
