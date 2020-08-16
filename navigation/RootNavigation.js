import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen';
import SecondaryScreen from '../screens/SecondaryScreen';

export default class RootNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Main" component={MainScreen} />
                    <Stack.Screen name="Secondary" component={SecondaryScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

    }
}

const Stack = createStackNavigator();