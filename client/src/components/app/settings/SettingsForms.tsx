import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { updateUser } from "../../../services/authApi";

const SettingsForms = () => {
  const { user } = useUser();
  const [name, setName] = useState<string>(""); //get user and make default values their info
  const [email, setEmail] = useState<string>("");

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
  }, [user]);

  function validateForm() {
    const newErrors: { name?: string; email?: string } = {};

    //Errors for name
    if (!name.trim()) {
      newErrors.name = "Please put in your full name (first and last)";
    }

    //Errors for email
    if (!email.trim()) {
      newErrors.email = "Please put in your email.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    if (!user) return;
    try {
      const { message } = await updateUser(
        name,
        email,
        user.autoActivateBudget,
        user.activateBudget,
      );
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`w-full h-auto bg-(--primary) p-5 lg:max-w-200`}>
      <div
        className={`w-full h-auto bg-(--card) border border-white/10 rounded-[20px] p-5`}
      >
        <form onSubmit={submit}>
          <div
            className={`flex items-center justify-start text-2xl mb-5 text-white font-bold text-[1.2rem] lg:mb-10`}
          >
            <span className="material-symbols-outlined mr-2 text-green-500 text-[1.2rem]!">
              person
            </span>{" "}
            Profile
          </div>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="" className={`text-(--greyText)`}>
              Full name
            </label>
            <input
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 text-white`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className={`text-red-500`}>{errors.name}</p>}
          </div>
          <div className={`flex flex-col mb-5 lg:mb-10`}>
            <label htmlFor="" className={`text-(--greyText)`}>
              Email
            </label>
            <input
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 text-white`}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className={`text-red-500`}>{errors.email}</p>}
          </div>
          <button
            type="submit"
            className={`cursor-pointer mb-5 bg-(--purple) text-white font-bold p-2 flex items-center justify-center px-5 rounded-full text-[1.1rem] `}
          >
            <span className="material-symbols-outlined mr-2">save</span> Save
            Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsForms;
