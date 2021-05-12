import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgChevronLeft(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path
        d="M14.25 5.25L7.5 12l6.75 6.75 1.672-1.672L10.845 12l5.077-5.078L14.25 5.25z"
        fill="#183148"
      />
    </Svg>
  );
}

export default SvgChevronLeft;
