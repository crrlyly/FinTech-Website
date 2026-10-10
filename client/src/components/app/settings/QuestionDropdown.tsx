import { useState } from "react";
import type { QuestAndAnswerProp } from "./Questions";

const QuestionDropdown = ({ question }: { question: QuestAndAnswerProp }) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div
      className={`w-full h-auto bg-(--card) border border-white/10 rounded-[10px] p-2`}
    >
      <div
        className={`flex items-center justify-between text-[1.1rem] font-semibold`}
      >
        {question.question}{" "}
        <button
          onClick={() => setActive((p) => !p)}
          className={`cursor-pointer flex justify-center items-center p-2 text-(--greyText)`}
        >
          <span className={`material-symbols-outlined`}>
            {active ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
      </div>
      <p
        className={`${active ? "block" : "hidden"} text-(--greyText) text-[1rem] font-normal`}
      >
        {question.answer}
      </p>
    </div>
  );
};

export default QuestionDropdown;
