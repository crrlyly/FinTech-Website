import { useState } from "react";

const SettingsForms = () => {
  const [name, setName] = useState<string>(""); //get user and make default values their info
  const [email, setEmail] = useState<string>("");

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email);
  };

  //do useEffect where if name or email change then submit that update into database

  return (
    <div className={`w-full h-auto bg-pink-200 p-5`}>
      <div className={`w-full h-auto bg-blue-300 p-5`}>
        <form onSubmit={submit}>
          <div className={`flex items-center justify-start text-2xl mb-5`}>
            <span className="material-symbols-outlined mr-2">person</span>{" "}
            Profile
          </div>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="">Full name</label>
            <input
              className={`bg-green-400`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="">Email</label>
            <input
              className={`bg-green-400`}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className={`mb-5 bg-purple-200 p-2 flex items-center justify-center px-5 rounded-full text-[1.1rem]`}>
            <span className="material-symbols-outlined mr-2">save</span> Saved
            Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsForms;
