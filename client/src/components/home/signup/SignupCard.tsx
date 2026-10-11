import { useState } from "react";
import { signUp } from "../../../services/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../context/UserContext";

export type SignupCardFormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
};

const SignupCard = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState<SignupCardFormDataProps>({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPass) {
      alert("Passwords dont match!");
      return;
    }

    try {
      const res = await signUp(formData);
      setUser(res.user);
      console.log("Sign up succesful", res);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
    }
    console.log(formData);
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
            account_box
          </span>
          Create your account
          <span className={`text-[1.1rem]! text-white/50 font-light mb-3 mt-2`}>
            Sign up to get started
          </span>
        </div>
        <form
          className={`border p-5 rounded-2xl mb-5 bg-(--card) border-white/10 text-white`}
          onSubmit={submit}
        >
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="" className={`text-[1rem] mb-2`}>
              Full Name
            </label>
            <input
              className={`border border-white/10 p-2 rounded-[10px]`}
              placeholder="Aaron Barns"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((p) => ({ ...p, name: e.target.value }))
              }
            />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="" className={`text-[1rem] mb-2`}>
              Email
            </label>
            <input
              className={`border border-white/10 p-2 rounded-[10px]`}
              placeholder="you@example.com"
              type="email"
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
              className={`border border-white/10 p-2 rounded-[10px]`}
              placeholder="*********"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((p) => ({ ...p, password: e.target.value }))
              }
            />
          </div>
          <div className={`flex flex-col mb-3`}>
            <label htmlFor="" className={`text-[1rem] mb-2`}>
              Confirm Password
            </label>
            <input
              className={`border border-white/10 p-2 rounded-[10px] mb-4`}
              placeholder="*********"
              type="password"
              value={formData.confirmPass}
              onChange={(e) =>
                setFormData((p) => ({ ...p, confirmPass: e.target.value }))
              }
            />
          </div>
          <button
            className={`cursor-pointer w-full p-3 rounded-2xl bg-(--purple)`}
            type="submit"
          >
            Create Account
          </button>
        </form>
        <div
          className={`w-full flex justify-center items-center gap-2 text-white/40`}
        >
          Already have an account?{" "}
          <Link to="/login" className={`text-(--purple)`}>
            {" "}
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
