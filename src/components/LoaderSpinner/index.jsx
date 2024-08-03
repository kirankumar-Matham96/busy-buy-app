import { RotatingLines } from "react-loader-spinner";
import loaderStyles from "./index.module.css";

/**
 * JSX component to display a rotating lines loader spinner.
 * This spinner is used to indicate loading states in the application.
 * @returns JSX - LoaderSpinner component
 */
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
