import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authApi";

export interface LoginFormDataProps {
  email: string;
  password: string;
}

const LoginCard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormDataProps>({
    email: "",
    password: "",
  });

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await login(formData);
      console.log("Log in succesful", res);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed!");
    }
  };

  return (
    <div className={`w-full h-auto bg-blue-200rounded-3xl`}>
      <div
        className={`flex flex-col items-center text-3xl mb-5 font-extrabold`}
      >
        <span className="material-symbols-outlined text-2xl! ">login</span>
        Welcome back!
        <span className={`text-[1.1rem]!`}>Log in to your account</span>
      </div>
      <form onSubmit={submit} className={`border p-5 rounded-3xl mb-5`}>
        <div className={`flex flex-col mb-3`}>
          <label htmlFor="" className={`text-2xl`}>
            Email
          </label>
          <input
            placeholder="you@example.com"
            type="text"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
          />
        </div>
        <div className={`flex flex-col mb-3`}>
          <label htmlFor="" className={`text-2xl`}>
            Password
          </label>
          <input
            placeholder="*********"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((p) => ({ ...p, password: e.target.value }))
            }
          />
        </div>
        <button className={`bg-green-200 w-full p-3`} type="submit">
          Log in
        </button>
      </form>
      <div className={`w-full flex justify-center items-center gap-1`}>
        Don't have an account?{" "}
        <Link to="/signup" className={`text-blue-600`}>
          {" "}
          Create one
        </Link>
      </div>
    </div>
  );
};

export default LoginCard;
