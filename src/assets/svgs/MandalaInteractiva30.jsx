
import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

// Mandala con 30 zonas tocables
const MandalaInteractiva30 = ({
  zona1, zona2, zona3, zona4, zona5, zona6, zona7, zona8, zona9, zona10, zona11, zona12, zona13, zona14, zona15, zona16, zona17, zona18, zona19, zona20, zona21, zona22, zona23, zona24, zona25, zona26, zona27, zona28, zona29, zona30
}) => (
  <Svg width={400} height={400} viewBox="0 0 400 400">
    <Circle cx="200" cy="200" r="30" {...zona1} /><Path d="M200 200 L300.0 200.0 A100 100 0 0 1 337.9 224.3 Z" {...zona2} /><Path d="M200 200 L297.7 221.5 A100 100 0 0 1 329.4 253.4 Z" {...zona3} /><Path d="M200 200 L290.8 242.0 A100 100 0 0 1 314.9 280.0 Z" {...zona4} /><Path d="M200 200 L279.6 260.5 A100 100 0 0 1 295.0 302.8 Z" {...zona5} /><Path d="M200 200 L264.7 276.2 A100 100 0 0 1 270.7 320.8 Z" {...zona6} /><Path d="M200 200 L246.8 288.4 A100 100 0 0 1 243.1 333.2 Z" {...zona7} /><Path d="M200 200 L226.8 296.4 A100 100 0 0 1 213.5 339.4 Z" {...zona8} /><Path d="M200 200 L205.4 299.9 A100 100 0 0 1 183.2 339.0 Z" {...zona9} /><Path d="M200 200 L183.8 298.7 A100 100 0 0 1 153.7 332.1 Z" {...zona10} /><Path d="M200 200 L163.0 292.9 A100 100 0 0 1 126.4 319.1 Z" {...zona11} /><Path d="M200 200 L143.9 282.8 A100 100 0 0 1 102.5 300.5 Z" {...zona12} /><Path d="M200 200 L127.4 268.8 A100 100 0 0 1 83.2 277.2 Z" {...zona13} /><Path d="M200 200 L114.3 251.6 A100 100 0 0 1 69.3 250.3 Z" {...zona14} /><Path d="M200 200 L105.2 231.9 A100 100 0 0 1 61.6 221.0 Z" {...zona15} /><Path d="M200 200 L100.6 210.8 A100 100 0 0 1 60.3 190.7 Z" {...zona16} /><Path d="M200 200 L100.6 189.2 A100 100 0 0 1 65.6 160.9 Z" {...zona17} /><Path d="M200 200 L105.2 168.1 A100 100 0 0 1 77.1 132.9 Z" {...zona18} /><Path d="M200 200 L114.3 148.4 A100 100 0 0 1 94.4 108.1 Z" {...zona19} /><Path d="M200 200 L127.4 131.2 A100 100 0 0 1 116.6 87.5 Z" {...zona20} /><Path d="M200 200 L143.9 117.2 A100 100 0 0 1 142.7 72.2 Z" {...zona21} /><Path d="M200 200 L163.0 107.1 A100 100 0 0 1 171.6 62.9 Z" {...zona22} /><Path d="M200 200 L183.8 101.3 A100 100 0 0 1 201.7 60.0 Z" {...zona23} /><Path d="M200 200 L205.4 100.1 A100 100 0 0 1 231.7 63.6 Z" {...zona24} /><Path d="M200 200 L226.8 103.6 A100 100 0 0 1 260.3 73.7 Z" {...zona25} /><Path d="M200 200 L246.8 111.6 A100 100 0 0 1 286.1 89.6 Z" {...zona26} /><Path d="M200 200 L264.7 123.8 A100 100 0 0 1 307.8 110.7 Z" {...zona27} /><Path d="M200 200 L279.6 139.5 A100 100 0 0 1 324.5 135.9 Z" {...zona28} /><Path d="M200 200 L290.8 158.0 A100 100 0 0 1 335.3 164.2 Z" {...zona29} /><Path d="M200 200 L297.7 178.5 A100 100 0 0 1 339.9 194.1 Z" {...zona30} />
  </Svg>
);

export default MandalaInteractiva30;
