import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgChevronDown(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path d="M15.625 8.125L10 13.75 4.375 8.125l1.394-1.394L10 10.963l4.231-4.232 1.394 1.394z" />
    </Svg>
  );
}

export default SvgChevronDown;
