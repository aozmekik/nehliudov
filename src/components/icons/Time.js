import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgTime(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <G
        stroke="#130F26"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.25 12a9.25 9.25 0 11-18.5 0 9.25 9.25 0 0118.5 0z"
        />
        <Path d="M16.19 12.767l-4.53-.074V7.846" />
      </G>
    </Svg>
  );
}

export default SvgTime;
