import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RadarChart from '../components/charts/RadarChart';
import AnimationTest from '../components/test/AnimationTest';

export default class MainScreen extends Component {
    render() {
        const score = happinessScore();

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Your Happiness Score: {score}</Text>
                {/* <AnimationTest /> */}
                <RadarChart data={data} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

const data = [
    {
        physical: 7,
        diet: 6,
        finances: 7,
        friends: 6,
        family: 5,
        love: 4,
        work: 9,
        leisure: 9
    },
];

const happinessScore = () => {
    let scoreKeys = Object.keys(data[0]);
    console.log(scoreKeys);
    let sum = 0;
    scoreKeys.forEach(key => {
        console.log((data[0])[key]);
        sum += (data[0])[key];
    });

    return (sum / scoreKeys.length).toFixed(2);
}