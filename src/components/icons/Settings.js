import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function SvgSettings(props) {
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
        clipRule="evenodd"
        d="M20.807 7.624l-.623-1.08a1.913 1.913 0 00-2.608-.705v0a1.904 1.904 0 01-2.61-.678 1.832 1.832 0 01-.255-.915v0a1.913 1.913 0 00-1.914-1.968h-1.254A1.904 1.904 0 009.64 4.191v0a1.913 1.913 0 01-1.913 1.886 1.83 1.83 0 01-.916-.257v0a1.913 1.913 0 00-2.608.705l-.669 1.099a1.913 1.913 0 00.696 2.608v0a1.913 1.913 0 010 3.314v0a1.904 1.904 0 00-.696 2.6v0l.632 1.089a1.913 1.913 0 002.609.741v0a1.895 1.895 0 012.6.696c.164.277.252.593.255.915v0c0 1.056.857 1.913 1.913 1.913h1.255c1.053 0 1.908-.85 1.912-1.904v0a1.904 1.904 0 011.914-1.913c.321.009.636.097.915.256v0a1.913 1.913 0 002.609-.695v0l.659-1.099a1.904 1.904 0 00-.696-2.608v0a1.904 1.904 0 01-.696-2.609c.166-.29.406-.53.696-.696v0a1.913 1.913 0 00.696-2.6v0-.008z"
        stroke="#130F26"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12.175}
        cy={11.889}
        r={2.636}
        stroke="#130F26"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgSettings;
