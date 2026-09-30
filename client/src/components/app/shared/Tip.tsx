const Tip = ({ tipString }: { tipString: string }) => {
  return <div className={`w-full h-auto bg-(--primary) text-(--greyText) p-5`}>{tipString}</div>;
};

export default Tip;
