import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgProfileActive(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.735 7.899A5.714 5.714 0 0113 13.632a5.714 5.714 0 01-5.735-5.733A5.713 5.713 0 0113 2.167a5.713 5.713 0 015.735 5.732zM13 23.833c-4.7 0-8.667-.763-8.667-3.71 0-2.948 3.993-3.685 8.667-3.685 4.7 0 8.667.764 8.667 3.71 0 2.949-3.993 3.685-8.667 3.685z"
        fill="#000"
      />
    </Svg>
  );
}

export default SvgProfileActive;
