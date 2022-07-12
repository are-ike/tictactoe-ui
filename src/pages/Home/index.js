import PrimaryButton from "../../components/button/PrimaryButton";

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-20">
      <h1 className="font-medium text-[130px] uppercase text-yellow tracking-[25px]">
        Tic tac toe
      </h1>
      <PrimaryButton isLink link={"/waiting-room"}>
        Play
      </PrimaryButton>
    </div>
  );
};

export default Home;

// const Home = () => {
//     return (
//         <div></div>
//     )
// }

// export default Home
