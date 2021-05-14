import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgPlus(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <G
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M8.025 5.642v4.765M10.41 8.025H5.64" />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.533 8.025c0-4.869 1.623-6.492 6.492-6.492 4.868 0 6.49 1.623 6.49 6.492 0 4.868-1.622 6.49-6.49 6.49-4.869 0-6.492-1.622-6.492-6.49z"
        />
      </G>
    </Svg>
  );
}

export default SvgPlus;
