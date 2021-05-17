import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgDownload(props) {
  return (
    <Svg
      width={20}
      height={21}
      viewBox="0 0 20 21"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path d="M9.88 12.791V.75M12.795 9.864L9.88 12.792 6.963 9.864" />
      <Path d="M14.37 5.259c3.58.33 4.88 1.67 4.88 7 0 7.1-2.31 7.1-9.25 7.1-6.94 0-9.25 0-9.25-7.1 0-5.33 1.3-6.67 4.88-7" />
    </Svg>
  );
}

export default SvgDownload;
