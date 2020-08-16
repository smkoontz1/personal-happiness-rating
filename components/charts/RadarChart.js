import React, { Component } from 'react';
import { Animated } from 'react-native';
import { Svg, G, Circle, Path, Polyline, Text } from 'react-native-svg';

export default class RadarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataAnim: new Animated.Value(0),
      animPercentage: 0.0
    };

    this.state.dataAnim.addListener((animator) => {
      this.setState({
        animPercentage: animator.value / 100
      });
    });
  }
  
  componentDidMount() {
    Animated.timing(this.state.dataAnim, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }
  
  render() {
    const captions = Object.keys(this.props.data[0]);
    const columns = captions.map((key, i, all) => {
      return {
        key,
        angle: (Math.PI * 2 * i) / all.length
      };
    });
    
    const groups = [];
    const scales = [];
    for (let i = numberOfScales; i > 0; i--) {
      scales.push(scale(i));
    }
    groups.push(<G key="scales">{scales}</G>);
    groups.push(<G key="group-axes">{columns.map(axis())}</G>);
    groups.push(<G key="groups">{this.props.data.map(this.shape(columns))}</G>);
    groups.push(<G key="group-captions">{columns.map(caption())}</G>);
    
    return (
      <Svg
      key="radar-chart"
      version="1"
      xmlns="http://www.w3.org/2000/svg"
      width="350"
      height="350"
      viewBox={`0 0 350 350`}
      >
        <G transform={`translate(${middleOfGraphic},${middleOfGraphic})`}>
          {groups}
        </G>
      </Svg>
    )
  }
  
  shape = columns => (chartData, i) => {
    const data = chartData;
    return (
      <Path
      key={`shape-${i}`}
      d={pathDefinition(
        columns.map(col => {
          const value = data[col.key] / 10 * this.state.animPercentage;
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
}
    
const graphicSize = 350;
const chartSize = 200;
const numberOfScales = 5;
const middleOfGraphic = (graphicSize / 2).toFixed(4);

const polarToX = (angle, distance) => Math.cos(angle - Math.PI / 2) * distance;
const polarToY = (angle, distance) => Math.sin(angle - Math.PI / 2) * distance;

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

const pathDefinition = points => {
  let d = 'M' + points[0][0].toFixed(4) + ',' + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += 'L' + points[i][0].toFixed(4) + ',' + points[i][1].toFixed(4);
  }

  return d + 'z';
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
    textAnchor="middle"
    x={polarToX(col.angle, (chartSize / 2) * 1.3).toFixed(4)}
    y={polarToY(col.angle, (chartSize / 2) * 1.3).toFixed(4)}
    dy={10 / 2}
    fill="#444"
    fontWeight="400"
    textShadow="1px 1px 0 #fff"
  >
    {col.key.toUpperCase()}
  </Text>
)

