import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import RiseLoader from "react-spinners/RiseLoader";

const LoadingSpinner = () => {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <FadeLoader
          color="black"
          height={10}
          loading
          margin={-5}
          speedMultiplier={3}
          width={2}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
