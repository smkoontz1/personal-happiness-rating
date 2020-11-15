import React, { Component } from 'react';

import RatingEntryScreen from './RatingEntryScreen';
import SubmissionScreen from './SubmissionScreen';

import { createStackNavigator } from '@react-navigation/stack';
import { DataEntryProvider } from '../../contexts/data_entry/DataEntryContext';

export default class MainDataEntryScreen extends Component {
  render() {
    return (
      <DataEntryProvider>
        <DataEntryStack.Navigator>
          <DataEntryStack.Screen name="Physical Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Physical" nextScreen="Diet Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Diet Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Diet" nextScreen="Finances Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Finances Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Finances" nextScreen="Friends Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Friends Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Friends" nextScreen="Family Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Family Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Family" nextScreen="Love Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Love Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Love" nextScreen="Work Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Work Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Work" nextScreen="Leisure Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Leisure Entry">
            {props => <RatingEntryScreen {...props} ratingCategory="Leisure" nextScreen="Submitting" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Submitting" component={SubmissionScreen} />
        </DataEntryStack.Navigator>
      </DataEntryProvider>
    );
  }
}

const DataEntryStack = createStackNavigator();