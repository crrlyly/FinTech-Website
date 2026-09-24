import { useState } from "react";
import type { QuestAndAnswerProp } from "./Questions";

const QuestionDropdown = ({ question }: { question: QuestAndAnswerProp }) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={`w-full h-auto bg-pink-200`}>
      <div className={`flex items-center justify-between`}>
        {question.question}{" "}
        <button onClick={()=>setActive(p=>!p)}>
          <span className={`material-symbols-outlined`}>{active ? "keyboard_arrow_up" : "keyboard_arrow_down"}</span>
   
        </button>
      </div>
      <p className={`${active ? "block" : "hidden"}`}>{question.answer}</p>
    </div>
  );
};

export default QuestionDropdown;
