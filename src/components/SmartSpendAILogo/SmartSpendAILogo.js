import React from 'react';
import { Svg, Path, Text, TSpan } from 'react-native-svg';

const SmartSpendAILogo = ({ width = 300, height = 300 }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 300 300">
      {/* Shield */}
      <Path
        d="M150 60 L210 90 L210 150 C210 190 180 230 150 245 C120 230 90 190 90 150 L90 90 Z"
        fill="none"
        stroke="#2EC4B6"
        strokeWidth={10}
        strokeLinejoin="round"
      />

      {/* Checkmark */}
      <Path
        d="M125 145 L145 165 L185 120"
        stroke="#FFB347"
        strokeWidth={12}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Text */}
      {/* <Text
        x="150"
        y="290"
        fontSize="42"
        fontFamily="Arial"
        fill="#2EC4B6"
        textAnchor="middle"
      >
        SmartSpend
        <TSpan fill="#FFB347">AI</TSpan>
      </Text> */}
    </Svg>
  );
};

export default SmartSpendAILogo;
