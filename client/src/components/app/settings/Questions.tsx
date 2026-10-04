import QuestionDropdown from "./QuestionDropdown";

export interface QuestAndAnswerProp {
  id: number;
  question: string;
  answer: string;
}

const qa: QuestAndAnswerProp[] = [
  {
    id: 1,
    question: "Does this work?",
    answer: "Nah not really lol",
  },
  {
    id: 2,
    question: "Does this work?",
    answer: "Nah not really lol",
  },
];

const Questions = () => {
  return (
    <div className={`w-full h-auto bg-(--primary) flex-1 p-5 lg:max-w-200`}>
      <div
        className={`w-full h-auto p-5 bg-(--primary) flex flex-col gap-3 text-white text-[1.2rem] font-bold lg:p-0`}
      >
        Frequently Asked Questions
        {qa.map((q) => (
          <QuestionDropdown key={q.id} question={q}></QuestionDropdown>
        ))}
      </div>
    </div>
  );
};

export default Questions;
