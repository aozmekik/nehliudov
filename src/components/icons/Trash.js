import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgTrash(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 .667h4c.736 0 1.333.597 1.333 1.333v.667h2c.737 0 1.334.597 1.334 1.333v1.333c0 .737-.597 1.334-1.334 1.334h-.053L12.667 14c0 .736-.597 1.333-1.334 1.333H4.667c-.737 0-1.334-.597-1.331-1.278L2.72 6.667h-.053a1.333 1.333 0 01-1.334-1.334V4c0-.736.597-1.333 1.334-1.333h2V2c0-.736.597-1.333 1.333-1.333zM4.667 14l-.61-7.333h7.885l-.606 7.278-.003.055H4.667zm-2-8.667V4h10.666v1.333H2.667zM10 2v.667H6V2h4z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgTrash;
