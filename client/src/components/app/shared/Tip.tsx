type TipProps = {
  activateBudget?: boolean;
  tipString: string;
};

const Tip = ({ activateBudget, tipString }: TipProps) => {
  return (
    <div
      className={`${activateBudget ? "block" : "hidden"} w-full h-auto bg-(--primary) text-(--greyText) p-5`}
    >
      {tipString}
    </div>
  );
};

export default Tip;
