import React, { Component } from 'react';
import { Animated, StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RadarChart from '../components/charts/RadarChart';

export default class MainScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Main Screen</Text>
                <RadarChart />
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