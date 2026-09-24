const Ratio = () => {
  return (
    <>
      <div className={`flex justify-between items-center mt-5 text-[1.2rem]`}>
        <span>$300.00</span>
        <span>of $500.00</span>
      </div>

      <div className={`w-full h-4 bg-red-100 rounded-full relative mt-2`}>
        <div
          className={`absolute top-0 left-0 w-[35%] h-full bg-pink-500 rounded-full`}
        ></div>
      </div>
    </>
  );
};

export default Ratio;
