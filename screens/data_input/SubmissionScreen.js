import React, { useContext, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text } from 'react-native';
import { AppContext } from '../../contexts/app/AppContext';
import { DataEntryContext } from '../../contexts/data_entry/DataEntryContext';

const SubmissionScreen = ({ navigation }) => {
  const appContext = useContext(AppContext);
  const dataEntryContext = useContext(DataEntryContext);

  useEffect(() => {
		appContext.db.transaction(tx => {
			tx.executeSql(
				'INSERT INTO survey (completed_on) VALUES (?);',
				[Date.now()],
				(tx, results) => {
					console.log('Survey results', results.rowsAffected);
					let surveyId = results.insertId;

					dataEntryContext.ratings.forEach(rating => {
						let ratingTypeId = rating.ratingTypeId;
						let value = rating.value;

						tx.executeSql(
							'INSERT INTO rating (fk_rating_type_id, value) VALUES (?, ?);',
							[ratingTypeId, value],
							(tx, results) => {
								console.log('Rating results', results.rowsAffected);
								let ratingId = results.insertId;

								tx.executeSql(
									'INSERT INTO survey_rating (fk_survey_id, fk_rating_id) VALUES (?, ?);',
									[surveyId, ratingId],
									(tx, results) => {
										console.log('Survey rating results', results.rowsAffected);
									},
									(tx, error) => {
										console.log(error);
										alert('Something went wrong.');
									}
									);
								},
							(tx, error) => {
								console.log(error);
								alert('Something went wrong.');
							}
						);
					});
							
					navigation.navigate('Main');
				},
				(tx, error) => {
					console.log(error);
					alert('Something went wrong.');
				}
			);
		});
				
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please wait...</Text>
      <ActivityIndicator size='large' />
    </View>
  );
};

export default SubmissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 50,
  }
});