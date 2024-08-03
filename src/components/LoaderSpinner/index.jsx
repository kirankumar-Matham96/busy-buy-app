import { RotatingLines } from "react-loader-spinner";
import loaderStyles from "./index.module.css";

export const LoaderSpinner = () => {
  return (
    <div className={loaderStyles.loaderContainer}>
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
