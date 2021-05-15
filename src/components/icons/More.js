import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgMore(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path d="M12 9.75A2.257 2.257 0 0114.25 12 2.257 2.257 0 0112 14.25 2.257 2.257 0 019.75 12 2.257 2.257 0 0112 9.75zm-6.75 0A2.257 2.257 0 017.5 12a2.257 2.257 0 01-2.25 2.25A2.257 2.257 0 013 12a2.257 2.257 0 012.25-2.25zm13.5 0A2.257 2.257 0 0121 12a2.257 2.257 0 01-2.25 2.25A2.257 2.257 0 0116.5 12a2.257 2.257 0 012.25-2.25z" />
    </Svg>
  );
}

export default SvgMore;
