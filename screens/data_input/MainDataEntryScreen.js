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
            {props => <RatingEntryScreen {...props} type="Physical" nextScreen="Diet Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Diet Entry">
            {props => <RatingEntryScreen {...props} type="Diet" nextScreen="Finances Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Finances Entry">
            {props => <RatingEntryScreen {...props} type="Finances" nextScreen="Friends Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Friends Entry">
            {props => <RatingEntryScreen {...props} type="Friends" nextScreen="Family Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Family Entry">
            {props => <RatingEntryScreen {...props} type="Family" nextScreen="Love Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Love Entry">
            {props => <RatingEntryScreen {...props} type="Love" nextScreen="Work Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Work Entry">
            {props => <RatingEntryScreen {...props} type="Work" nextScreen="Leisure Entry" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Leisure Entry">
            {props => <RatingEntryScreen {...props} type="Leisure" nextScreen="Submitting" />}
          </DataEntryStack.Screen>
          <DataEntryStack.Screen name="Submitting" component={SubmissionScreen} />
        </DataEntryStack.Navigator>
      </DataEntryProvider>
    );
  }
}

const DataEntryStack = createStackNavigator();