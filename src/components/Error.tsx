import { FC } from "react";

interface ErrorProps {
  title: string;
}

const Error: FC<ErrorProps> = ({ title }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <h1 className="text-white text-2xl mt-5">{title}</h1>
      </div>
    </>
  );
};

export default Error;
