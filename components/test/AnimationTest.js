import React, { Component, useRef } from 'react';
import { View, Button, Animated } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

export default class AnimationTest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      radiusAnim: new Animated.Value(50),
      radius: 50
    };

    this.state.radiusAnim.addListener((animator) => {
      this.setState({
        radius: animator.value
      });
    });
  }
  
  transform = () => {
    let target;
    if (this.state.radiusAnim._value == 50)
    {
      target = 100;
    }
    else if (this.state.radiusAnim._value == 100) {
      target = 50;
    }

    Animated.timing(this.state.radiusAnim, {
      toValue: target,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }

  render() {    
    return(
      <View>
        <Svg
          height="400"
          width="400">
          <Circle
            cx="200"
            cy="200"
            r={this.state.radius}
            fill="black"
            />
        </Svg>
        <Button title="Click Me" onPress={this.transform} />
      </View>
    )
  }
}
