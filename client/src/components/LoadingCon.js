import BarLoader from "react-spinners/BarLoader";

const LoadingCon = () => {
  return (
    <div className="loading-con">
      <h1>Loading...</h1>
      <BarLoader color="black" width={150} />
    </div>
  );
};

export default LoadingCon;
