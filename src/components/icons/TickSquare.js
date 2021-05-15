import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgTickSquare(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <G
        stroke="#183148"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M9.144 13l2.571 2.57 5.142-5.14" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.979 13c0 7.515 2.506 10.02 10.02 10.02 7.516 0 10.022-2.505 10.022-10.02S20.515 2.98 13 2.98C5.485 2.98 2.979 5.484 2.979 13z"
        />
      </G>
    </Svg>
  );
}

export default SvgTickSquare;
