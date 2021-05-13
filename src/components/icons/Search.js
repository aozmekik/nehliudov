import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgSearch(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 16a8 8 0 116.32-3.094l5.387 5.387-1.414 1.414-5.387-5.387A7.965 7.965 0 018 16zm6-8A6 6 0 112 8a6 6 0 0112 0z"
      />
    </Svg>
  );
}

export default SvgSearch;
