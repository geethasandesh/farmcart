import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import { View } from 'react-native';

const Logo = ({ size = 100, color = '#4CAF50' }) => {
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Background Circle */}
        <Circle cx="50" cy="50" r="45" fill="#E8F5E9" />
        
        {/* Carrot */}
        <Path
          d="M60,30 C60,30 70,25 75,35 C80,45 70,55 65,60 C60,65 55,70 50,75 C45,70 40,65 35,60 C30,55 20,45 25,35 C30,25 40,30 40,30 C45,25 55,25 60,30 Z"
          fill="#FF9800"
        />
        
        {/* Carrot Top */}
        <Path
          d="M40,30 C40,30 35,20 45,15 C55,10 60,20 60,20"
          stroke="#4CAF50"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Shopping Cart */}
        <Path
          d="M30,85 L70,85 L65,65 L35,65 Z"
          stroke={color}
          strokeWidth="3"
          fill="none"
        />
        
        {/* Cart Wheels */}
        <Circle cx="40" cy="90" r="3" fill={color} />
        <Circle cx="60" cy="90" r="3" fill={color} />
        
        {/* Cart Handle */}
        <Path
          d="M65,65 L75,55"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </Svg>
    </View>
  );
};

export default Logo; 