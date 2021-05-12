import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgChevronRight(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path
        d="M8.125 4.375L13.75 10l-5.625 5.625-1.394-1.394L10.963 10 6.73 5.769l1.394-1.394z"
        fill="#E11E3C"
      />
    </Svg>
  );
}

export default SvgChevronRight;
