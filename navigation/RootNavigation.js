import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../screens/MainScreen';

import MainDataEntryScreen from '../screens/data_input/MainDataEntryScreen';

export default class RootNavigator extends Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Data Entry" component={MainDataEntryScreen} />
                    <Stack.Screen name="Main" component={MainScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );

    }
}

const Stack = createStackNavigator();