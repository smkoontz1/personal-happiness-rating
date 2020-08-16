import React, { Component } from 'react';
import { Svg, G, Circle, Path, Polyline, Text } from 'react-native-svg';
import Animated from 'react-native-reanimated';

export default class RadarChart extends Component {

  render() {
    const groups = [];
    const scales = [];
    for (let i = numberOfScales; i > 0; i--) {
      scales.push(scale(i));
    }
    groups.push(<G key="scales">{scales}</G>);
    groups.push(<G key="group-axes">{columns.map(axis())}</G>);
    groups.push(<G key="groups">{data.map(shape(columns))}</G>);
    groups.push(<G key="group-captions">{columns.map(caption())}</G>);

    return (
      <Svg
        key="radar-chart"
        version="1"
        xmlns="http://www.w3.org/2000/svg"
        width={chartSize}
        height={chartSize}
        viewBox={`0 0 ${chartSize} ${chartSize}`}
      >
        <G transform={`translate(${middleOfChart},${middleOfChart})`}>
          {groups}
        </G>
      </Svg>
    )
  }
}

// const data = [
//   { battery: 0.7, design: 1, useful: 0.9, speed: 0.67, weight: 0.8 },
//   { battery: 0.6, design: 0.9, useful: 0.8, speed: 0.7, weight: 0.6 }
// ];

const data = [
  {
    diet: .6,
    physical: .7,
    finances: .7,
    friends: .6,
    family: .5,
    love: .4,
    work: .9,
    leisure: .9
  },
  // {
  //   diet: .6,
  //   physical: .5,
  //   finances: .9,
  //   friends: .4,
  //   family: .8,
  //   love: .8,
  //   work: .7,
  //   leisure: .4
  // }
];

const chartSize = 300;
const numberOfScales = 5;
const middleOfChart = (chartSize / 2).toFixed(4);

const scale = value => (
  <Circle
    key={`scale-${value}`}
    cx={0}
    cy={0}
    r={((value / numberOfScales) * chartSize) / 2}
    fill="#fafafa"
    stroke="#999"
    strokeWidth="0.2" />
);

const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;
const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

const pathDefinition = points => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }

  return d + 'z';
};

const shape = columns => (chartData, i) => {
  const data = chartData;
  return (
    <Path
      key={`shape-${i}`}
      d={pathDefinition(
        columns.map(col => {
          const value = data[col.key];
          return [
            polarToX(col.angle, (value * chartSize) / 2),
            polarToY(col.angle, (value * chartSize) / 2)
          ];
        })
      )}
      stroke="#5dade2"
      fill="#5dade2"
      fillOpacity=".5"
    />
  );
};

const points = points => {
  return points
    .map(point => point[0].toFixed(4) + ',' + point[1].toFixed(4))
    .join(' ');
}

const axis = () => (col, i) => (
  <Polyline
    key={`poly-axis-${i}`}
    points={points([
      [0, 0],
      [polarToX(col.angle, chartSize / 2), polarToY(col.angle, chartSize / 2)]
    ])}
    stroke="#555"
    strokeWidth=".2"
  />
)

const caption = () => col => (
  <Text
    key={`caption-of-${col.key}`}
    x={polarToX(col.angle, (chartSize / 2) * 0.95).toFixed(4)}
    y={polarToY(col.angle, (chartSize / 2) * 0.95).toFixed(4)}
    dy={10 / 2}
    fill="#444"
    fontWeight="400"
    textShadow="1px 1px 0 #fff"
  >
    {col.key.toUpperCase()}
  </Text>
)

const captions = Object.keys(data[0]);
const columns = captions.map((key, i, all) => {
  return {
    key,
    angle: (Math.PI * 2 * i) / all.length
  };
});
