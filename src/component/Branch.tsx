import React from 'react';
import { G, Line } from 'react-native-svg';

import { BranchProps } from '../type';

const stroke = 'black';
const strokeWidth = 0.5;

const Branch: React.FC<BranchProps> = ({ x, y, branchHeight, branchXs }) => {
  if (branchXs.length > 1) {
    const [firstX] = branchXs;
    const branchWidth = branchXs[branchXs.length - 1] - firstX;
    const firstY = y;
    const secondY = y + branchHeight / 2;
    const thirdY = y + branchHeight;
    return (
      <G>
        <Line
          x1={x}
          x2={x}
          y1={firstY}
          y2={secondY}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        <Line
          x1={firstX}
          x2={firstX + branchWidth}
          y1={secondY}
          y2={secondY}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
        {branchXs.map((branchX) => (
          <Line
            key={branchX}
            x1={branchX}
            x2={branchX}
            y1={secondY}
            y2={thirdY}
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        ))}
      </G>
    );
  }
  return (
    <G>
      <Line
        x1={x}
        x2={x}
        y1={y}
        y2={y + branchHeight}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </G>
  );
};

export default Branch;
