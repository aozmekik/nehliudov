import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgCheck(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path d="M10 1.667c-4.595 0-8.333 3.738-8.333 8.333 0 4.595 3.738 8.333 8.333 8.333 4.595 0 8.333-3.738 8.333-8.333 0-4.595-3.738-8.333-8.333-8.333zm-1.666 12.01L5.24 10.59l1.177-1.18 1.916 1.912 4.411-4.411 1.179 1.178-5.589 5.588z" />
    </Svg>
  );
}

export default SvgCheck;
