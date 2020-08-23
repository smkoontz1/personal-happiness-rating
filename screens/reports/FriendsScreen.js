import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class FriendsScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Friends</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});