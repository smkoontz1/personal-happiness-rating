import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RadarChart from '../components/charts/RadarChart';
import { AppContext } from '../contexts/app/AppContext';

const MainScreen = ({ navigation }) => {
	const appContext = useContext(AppContext);
	const [ratingData, setRatingData] = useState([]);
	const [dataReady, setDataReady] = useState(false);

	useEffect(
		() => {
			if (ratingData.length <= 0) {
				appContext.db.transaction(tx => {
					tx.executeSql(
						"SELECT rt.type, r.value\n" +
							"FROM rating r\n" +
							"JOIN rating_type rt\n" +
								"ON rt.id = r.fk_rating_type_id\n" +
							"JOIN survey_rating sr\n" +
								"ON sr.fk_rating_id = r.id\n" +
							"WHERE sr.fk_survey_id = (SELECT MAX(id) FROM survey s)",
						[],
						(tx, results) => {
							if (ratingData.length <= 0) {
								setRatingData(results.rows._array);
								setDataReady(true);
							}
						},
						(tx, error) => {
							console.log(error);
						}
					);
				});
			}
		},
	);

	let getChartData = () => {
		let chartData = [];
		let chartRatingData = new Object();

		ratingData.forEach(rating => {
			chartRatingData[rating.type] = rating.value;
		});

		chartData.push(chartRatingData);

		return chartData;
	}

	let getHappinessScore = () => {
		let sum = 0;

		ratingData.forEach(rating => {
			sum += rating.value;
		});

		return (sum / ratingData.length).toFixed(2);
	}

	if (!dataReady) {
		return (
			<View style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Happiness Score: {getHappinessScore()}</Text>
			<RadarChart data={getChartData()} navigate={navigation.navigate} />
		</View>
	);
};

export default MainScreen;

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

// const data = [
// 	{
// 		Physical: 7,
// 		Diet: 6,
// 		Finances: 7,
// 		Friends: 6,
// 		Family: 5,
// 		Love: 8,
// 		Work: 9,
// 		Leisure: 9
// 	},
// ];