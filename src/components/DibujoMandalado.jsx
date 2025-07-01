// components/DibujoMandalado.jsx
import React from "react";
import Svg, { Circle, Rect, Path } from "react-native-svg";

const DibujoMandalado = ({ zonas, pintarZona }) => {
  return (
    <Svg height="300" width="300" viewBox="0 0 300 300">
      <Circle
        cx="150"
        cy="80"
        r="50"
        fill={zonas.zona1}
        onPress={() => pintarZona("zona1")}
      />
      <Rect
        x="50"
        y="160"
        width="60"
        height="60"
        fill={zonas.zona2}
        onPress={() => pintarZona("zona2")}
      />
      <Rect
        x="190"
        y="160"
        width="60"
        height="60"
        fill={zonas.zona3}
        onPress={() => pintarZona("zona3")}
      />
      <Path
        d="M150 150 L180 200 L120 200 Z"
        fill={zonas.zona4}
        onPress={() => pintarZona("zona4")}
      />
      <Circle
        cx="150"
        cy="250"
        r="20"
        fill={zonas.zona5}
        onPress={() => pintarZona("zona5")}
      />
    </Svg>
  );
};

export default DibujoMandalado;
