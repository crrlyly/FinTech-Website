import { useEffect, useState } from "react";
import { useUser } from "../../../context/UserContext";
import { updateUser } from "../../../services/authApi";

const SettingsForms = () => {
  const { user } = useUser();
  const [name, setName] = useState<string>(""); //get user and make default values their info
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }
  }, [user]);

  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { message } = await updateUser(name, email);
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
            className={`flex items-center justify-start text-2xl mb-5 text-white font-bold text-[1.2rem]`}
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
          </div>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="" className={`text-(--greyText)`}>
              Email
            </label>
            <input
              className={`bg-white/10 border border-white/10 rounded-[5px] pl-3 py-1 text-white`}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className={`mb-5 bg-(--purple) text-white font-bold p-2 flex items-center justify-center px-5 rounded-full text-[1.1rem]`}
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
