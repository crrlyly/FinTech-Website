import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authApi";
import { useUser } from "../../../context/UserContext";

export interface LoginFormDataProps {
  email: string;
  password: string;
}

const LoginCard = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState<LoginFormDataProps>({
    email: "test1@gmail.com",
    password: "1",
  });

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      setUser(res.user);
      console.log("Log in succesful", res);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed!");
    }
  };

  return (
    <div
      className={`w-full h-auto bg-(--primary) rounded-3xl flex justify-center items-center`}
    >
      <div className={`w-full max-w-150`}>
        <div
          className={`flex flex-col items-center text-4xl mb-5 font-bold text-white`}
        >
          <span className="material-symbols-outlined text-4xl! text-white bg-(--purple) p-2 rounded-2xl mb-2">
            login
          </span>
          Welcome back!
          <span className={`text-[1.1rem]! text-white/50 font-light mb-3 mt-2`}>
            Log in to your account
          </span>
        </div>
        <form
          onSubmit={submit}
          className={`border p-5 rounded-2xl mb-5 bg-(--card) border-white/10 text-white`}
        >
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="" className={`text-[1rem] mb-2`}>
              Email
            </label>
            <input
              className={`border border-white/10 p-2 rounded-[10px]`}
              placeholder="you@example.com"
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData((p) => ({ ...p, email: e.target.value }))
              }
            />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="" className={`text-[1rem] mb-2`}>
              Password
            </label>
            <input
              className={`border border-white/10 p-2 rounded-[10px] mb-2`}
              placeholder="*********"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>
          <button
            className={`cursor-pointer w-full p-3 rounded-2xl bg-(--purple)`}
            type="submit"
          >
            Log in
          </button>
        </form>
        <div
          className={`w-full flex justify-center items-center gap-2 text-white/40`}
        >
          Don't have an account?{" "}
          <Link to="/signup" className={`text-(--purple)`}>
            {" "}
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
