import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';

const RatingEntry = (props) => {
  let numValue = 1;

  const onClick = () => {
    props.onClick(numValue);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.numberContainer}>
        <NumericInput
          initValue={1}
          onChange={value => numValue = value}
          rounded
          minValue={1}
          maxValue={10}
          step={1}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onClick.bind(this)}
          title="Next"
        />
      </View>
    </View>
  )
};

export default RatingEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  numberContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});