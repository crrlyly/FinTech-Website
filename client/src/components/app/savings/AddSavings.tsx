import { useState } from "react";

interface formProps {
  goalName: string;
  targetAmount: string;
  saved: string;
  targetDate: string;
}

type AddSavingsProps = {
  active: boolean;
  handleClick: () => void;
};

// props: {
//     active:
//     handleCLick
// }

// props:{
//     otherThing: {
//         eat: 
//         sfg:
//     }
// }

const AddSavings = ({ active, handleClick }: AddSavingsProps) => {
  const [formData, setFormData] = useState<formProps>({
    goalName: "",
    targetAmount: "",
    saved: "",
    targetDate: "",
  });

  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div
      className={`${active ? "flex" : "hidden"} z-80 w-full h-full fixed top-0 bg-pink-200 justify-center items-center `}
    >
      <div className={`w-full h-auto bg-blue-200 m-5 p-7`}>
        <div className={`flex items-center justify-between text-2xl mb-5`}>
          New Savings Goal
          <button onClick={handleClick}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={submit}>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="">Goal Name</label>
            <input
              className={`bg-red-200`}
              type="text"
              value={formData.goalName}
              onChange={(e) =>
                setFormData((p) => ({ ...p, goalName: e.target.value }))
              }
            />
          </div>
          <div className={`flex gap-3 mb-5`}>
            <div>
              <label htmlFor="">Target Amount</label>
              <input
                className={`bg-red-200`}
                placeholder="0"
                type="number"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    targetAmount: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <label htmlFor="">Saved So Far</label>
              <input
                className={`bg-red-200`}
                placeholder="0"
                type="number"
                value={formData.saved}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, saved: e.target.value }))
                }
              />
            </div>
          </div>
          <div className={`flex flex-col mb-5`}>
            <label htmlFor="">Target Date</label>
            <input
              className={`bg-red-200`}
              type="date"
              value={formData.targetDate}
              onChange={(e) =>
                setFormData((p) => ({ ...p, targetDate: e.target.value }))
              }
            />
          </div>
          <button className={`bg-red-200 w-full p-3`} type="submit">
            Create goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSavings;
