
import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

// Mandala Flor con 30 zonas
const MandalaFlor = ({
  zona1, zona2, zona3, zona4, zona5, zona6, zona7, zona8, zona9, zona10, zona11, zona12, zona13, zona14, zona15, zona16, zona17, zona18, zona19, zona20, zona21, zona22, zona23, zona24, zona25, zona26, zona27, zona28, zona29, zona30
}) => (
  <Svg width={400} height={400} viewBox="0 0 400 400">
    <Circle cx="200" cy="200" r="30" {...zona1} />
    <Path d="M200 200 L317.4 224.9 A150 150 0 0 1 348.3 259.9 Z" {...zona2} /><Path d="M200 200 L309.6 248.8 A150 150 0 0 1 332.6 289.5 Z" {...zona3} /><Path d="M200 200 L297.1 270.5 A150 150 0 0 1 311.1 315.1 Z" {...zona4} /><Path d="M200 200 L280.3 289.2 A150 150 0 0 1 284.8 335.7 Z" {...zona5} /><Path d="M200 200 L260.0 303.9 A150 150 0 0 1 254.7 350.4 Z" {...zona6} /><Path d="M200 200 L237.1 314.1 A150 150 0 0 1 222.3 358.4 Z" {...zona7} /><Path d="M200 200 L212.5 319.3 A150 150 0 0 1 188.8 359.6 Z" {...zona8} /><Path d="M200 200 L187.5 319.3 A150 150 0 0 1 155.9 353.8 Z" {...zona9} /><Path d="M200 200 L162.9 314.1 A150 150 0 0 1 124.9 341.3 Z" {...zona10} /><Path d="M200 200 L140.0 303.9 A150 150 0 0 1 97.2 322.6 Z" {...zona11} /><Path d="M200 200 L119.7 289.2 A150 150 0 0 1 73.9 298.5 Z" {...zona12} /><Path d="M200 200 L102.9 270.5 A150 150 0 0 1 56.2 270.1 Z" {...zona13} /><Path d="M200 200 L90.4 248.8 A150 150 0 0 1 44.8 238.7 Z" {...zona14} /><Path d="M200 200 L82.6 224.9 A150 150 0 0 1 40.1 205.6 Z" {...zona15} /><Path d="M200 200 L80.0 200.0 A150 150 0 0 1 42.4 172.2 Z" {...zona16} /><Path d="M200 200 L82.6 175.1 A150 150 0 0 1 51.7 140.1 Z" {...zona17} /><Path d="M200 200 L90.4 151.2 A150 150 0 0 1 67.4 110.5 Z" {...zona18} /><Path d="M200 200 L102.9 129.5 A150 150 0 0 1 88.9 84.9 Z" {...zona19} /><Path d="M200 200 L119.7 110.8 A150 150 0 0 1 115.2 64.3 Z" {...zona20} /><Path d="M200 200 L140.0 96.1 A150 150 0 0 1 145.3 49.6 Z" {...zona21} /><Path d="M200 200 L162.9 85.9 A150 150 0 0 1 177.7 41.6 Z" {...zona22} /><Path d="M200 200 L187.5 80.7 A150 150 0 0 1 211.2 40.4 Z" {...zona23} /><Path d="M200 200 L212.5 80.7 A150 150 0 0 1 244.1 46.2 Z" {...zona24} /><Path d="M200 200 L237.1 85.9 A150 150 0 0 1 275.1 58.7 Z" {...zona25} /><Path d="M200 200 L260.0 96.1 A150 150 0 0 1 302.8 77.4 Z" {...zona26} /><Path d="M200 200 L280.3 110.8 A150 150 0 0 1 326.1 101.5 Z" {...zona27} /><Path d="M200 200 L297.1 129.5 A150 150 0 0 1 343.8 129.9 Z" {...zona28} /><Path d="M200 200 L309.6 151.2 A150 150 0 0 1 355.2 161.3 Z" {...zona29} /><Path d="M200 200 L317.4 175.1 A150 150 0 0 1 359.9 194.4 Z" {...zona30} />
  </Svg>
);

export default MandalaFlor;
