import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

function SvgCamera(props) {
  return (
    <Svg
      width={28}
      height={28}
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      className=""
      {...props}
    >
      <G
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.011 14.581a3.67 3.67 0 10-7.34 0 3.67 3.67 0 007.34 0z"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.341 23.567c9.386 0 10.504-2.813 10.504-8.906 0-4.271-.565-6.557-4.123-7.54a2.248 2.248 0 01-.982-.622c-.474-.52-.82-2.115-1.965-2.597-1.145-.482-5.741-.46-6.867 0-1.125.46-1.491 2.078-1.965 2.597-.294.323-.655.52-.983.623-3.557.982-4.122 3.268-4.122 7.539 0 6.094 1.117 8.906 10.503 8.906z"
        />
        <Path d="M20.072 10.5h.01" />
      </G>
    </Svg>
  );
}

export default SvgCamera;
