import { FC } from "react";
import { loader } from "../assets";

interface LoaderProps {
  title: string;
}

const Loader: FC<LoaderProps> = ({ title }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        <h1 className="text-white text-2xl mt-5">{title}</h1>
      </div>
    </>
  );
};

export default Loader;
