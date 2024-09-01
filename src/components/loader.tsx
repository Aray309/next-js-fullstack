import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = ({ height, width }: { height: string; width: string }) => {
  return (
    <>
      <ColorRing
        visible={true}
        height={height ? height : "50"}
        width={width ? width : "50"}
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </>
  );
};

export default Loader;
