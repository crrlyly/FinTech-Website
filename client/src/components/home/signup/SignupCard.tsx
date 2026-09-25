import { useState } from "react";
import { signUp } from "../../../services/authApi";
import { useNavigate } from "react-router-dom";

export type SignupCardFormDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
};

const SignupCard = () => {
  const navigate = useNavigate();
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
      console.log("Sign up succesful", res);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed", error);
    }
    console.log(formData);
  };

  return (
    <div className={`w-full h-auto bg-blue-200rounded-3xl`}>
      <div
        className={`flex flex-col items-center text-3xl mb-5 font-extrabold`}
      >
        <span className="material-symbols-outlined text-2xl! ">
          account_box
        </span>
        Create your account
        <span className={`text-[1.1rem]!`}>Sign up to get started</span>
      </div>
      <form className={`border p-5 rounded-3xl mb-5`} onSubmit={submit}>
        <div className={`flex flex-col mb-3`}>
          <label htmlFor="" className={`text-2xl`}>
            Full Name
          </label>
          <input
            placeholder="Aaron Barns"
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((p) => ({ ...p, name: e.target.value }))
            }
          />
        </div>
        <div className={`flex flex-col mb-3`}>
          <label htmlFor="" className={`text-2xl`}>
            Email
          </label>
          <input
            placeholder="you@example.com"
            type="email"
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
        <div className={`flex flex-col mb-3`}>
          <label htmlFor="" className={`text-2xl`}>
            Confirm Password
          </label>
          <input
            placeholder="*********"
            type="password"
            value={formData.confirmPass}
            onChange={(e) =>
              setFormData((p) => ({ ...p, confirmPass: e.target.value }))
            }
          />
        </div>
        <button className={`bg-green-200 w-full p-3`} type="submit">
          Create Account
        </button>
      </form>
      <div className={`w-full flex justify-center items-center gap-1`}>
        Already have an account?{" "}
      </div>
    </div>
  );
};

export default SignupCard;
