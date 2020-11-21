import React from 'react';
import { StyleSheet, View, Text, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const RatingEntry = (props) => {
	let numValue = 1;
	let comment = '';

  const onClick = () => {
    props.onClick(numValue);
  }

  return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ?  'padding' : null}
			style={{ flex: 1 }}
		>
			<SafeAreaView style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.inner}>
						<View style={styles.ratingContainer}>
							<Text style={styles.description}>Rate your satisfaction on a 10 point scale with this aspect of your life:</Text>
							<Text style={styles.ratingCategory}>{props.ratingCategory}</Text>
							<View style={styles.numericInputContainer}>
								<NumericInput
									style={styles.numericInput}
									initValue={1}
									onChange={value => numValue = value}
									rounded
									minValue={1}
									maxValue={10}
									step={1}
								/>
							</View>
						</View>
						<View style={styles.commentContainer}>
							<Text style={styles.commentDescription}>Optionally, add a comment on how you can improve your score in this area over the next week:</Text>
							<TextInput
								style={styles.comment}
								multiline
								numberOfLines={4}
								textAlignVertical="top"
							/>
						</View>
						<View style={styles.buttonContainer}>
							<Button
								onPress={onClick.bind(this)}
								title="Next"
							/>
						</View>
						<View style={{ flex : 1 }} />
					</View>
				</TouchableWithoutFeedback>
			</SafeAreaView>
		</KeyboardAvoidingView>
  )
};

export default RatingEntry;

const styles = StyleSheet.create({
  container: {
		flex: 1,
	},
	inner: {
		padding: 25,
		flex: 1,
		justifyContent: 'flex-end',
	},
  description: {
    fontSize: 20,
		textAlign: 'center',
	},
	ratingContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	ratingCategory: {
		fontSize: 25,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 40,
	},
	numericInputContainer: {
		marginBottom: 50,
	},
	commentDescription: {
		textAlign: 'center',
		fontSize: 14,
		marginBottom: 20,
	},
	commentContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	comment: {
		borderColor: 'gray',
		borderWidth: 1,
		width: 300,		
	},
  buttonContainer: {
    justifyContent: 'center',
		alignItems: 'center',
		margin: 50,
  },
});