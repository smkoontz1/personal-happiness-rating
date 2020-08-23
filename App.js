import React, { Component } from 'react';
import RootNavigator from './navigation/RootNavigation';
import { AppProvider } from './contexts/app/AppContext';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('happiness.db');

export default class App extends Component {
  constructor(props) {
    super(props);
  
    db.transaction(tx => {
			// DROP EM
			tx.executeSql(
				'DROP TABLE IF EXISTS survey_rating;',
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
			);
      tx.executeSql(
				'DROP TABLE IF EXISTS survey;',
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
			tx.executeSql(
				'DROP TABLE IF EXISTS rating;',
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
			);
			tx.executeSql(
				'DROP TABLE IF EXISTS rating_type;',
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
			
			// CREATE EM
			tx.executeSql(
        "CREATE TABLE IF NOT EXISTS rating_type (\n" +
					"id INTEGER PRIMARY KEY AUTOINCREMENT,\n" + 
					"type TEXT\n" +
				");",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
			);
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS rating (\n" +
					"id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
					"fk_rating_type_id INTEGER,\n" +
					"value INTEGER,\n" +
					"FOREIGN KEY(fk_rating_type_id) REFERENCES rating_type(id)\n" +
				");",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
			);
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS survey (\n" +
					"id INTEGER PRIMARY KEY AUTOINCREMENT,\n" +
					"completed_on INTEGER\n" +
				");",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
			);
			tx.executeSql(
				"CREATE TABLE IF NOT EXISTS survey_rating (\n" +
					"fk_survey_id INTEGER,\n" +
					"fk_rating_id INTEGER,\n" +
					"FOREIGN KEY(fk_survey_id) REFERENCES survey(id),\n" +
					"FOREIGN KEY(fk_rating_id) REFERENCES rating(id)\n" +
				");",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
			);

			// INITIAL INSERTION
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Physical');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Diet');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Finances');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Friends');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Family');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Love');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Work');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
      tx.executeSql(
				"INSERT INTO rating_type (type) VALUES ('Leisure');",
				[],
				() => {},
				(tx, error) => {
					console.log(error);
				}
      );
    })
  }

  render() {
    return (
      <AppProvider>
        <RootNavigator />
      </AppProvider>
    );
  }
}