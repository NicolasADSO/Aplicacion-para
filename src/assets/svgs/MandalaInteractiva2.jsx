
import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

// Mandala con 10 zonas tocables
const MandalaInteractiva2 = ({
  zona1, zona2, zona3, zona4, zona5,
  zona6, zona7, zona8, zona9, zona10
}) => (
  <Svg width={300} height={300} viewBox="0 0 300 300">
    <Circle cx="150" cy="150" r="25" {...zona1} />
    <Path d="M150 150 L150 70 A80 80 0 0 1 230 150 Z" {...zona2} />
    <Path d="M150 150 L230 150 A80 80 0 0 1 150 230 Z" {...zona3} />
    <Path d="M150 150 L150 230 A80 80 0 0 1 70 150 Z" {...zona4} />
    <Path d="M150 150 L70 150 A80 80 0 0 1 150 70 Z" {...zona5} />
    <Path d="M150 150 L190 90 A60 60 0 0 1 210 150 Z" {...zona6} />
    <Path d="M150 150 L190 210 A60 60 0 0 1 150 230 Z" {...zona7} />
    <Path d="M150 150 L110 210 A60 60 0 0 1 90 150 Z" {...zona8} />
    <Path d="M150 150 L110 90 A60 60 0 0 1 150 70 Z" {...zona9} />
    <Path d="M150 150 L170 130 L190 150 L170 170 Z" {...zona10} />
  </Svg>
);

export default MandalaInteractiva2;
