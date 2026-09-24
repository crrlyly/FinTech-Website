import QuestionDropdown from "./QuestionDropdown";

export interface QuestAndAnswerProp {
  id: number,
  question: string;
  answer: string;
}

const qa: QuestAndAnswerProp[] = [
  {
    id:1,
    question: "Does this work?",
    answer: "Nah not really lol",
  },
  {
    id:2,
    question: "Does this work?",
    answer: "Nah not really lol",
  },
];

const Questions = () => {
  return (
    <div className={`w-full h-auto bg-blue-200 flex-1 p-5`}>
      <div className={`w-full h-auto p-5 bg-orange-400 flex flex-col gap-3`}>
        Frequently Asked Questions
        {qa.map(q=>(<QuestionDropdown key={q.id} question={q}></QuestionDropdown>))}
      </div>
    </div>
  );
};

export default Questions;
