import React, { useContext, useLayoutEffect } from 'react';
import RatingEntry from '../../components/data_entry/RatingEntry';
import Rating from '../../models/Rating';
import { AppContext } from '../../contexts/app/AppContext';
import { DataEntryContext } from '../../contexts/data_entry/DataEntryContext'

const RatingEntryScreen = (props) => {
  const appContext = useContext(AppContext);
  const dataEntryContext = useContext(DataEntryContext);

  let rating = new Rating();

  const handleRatingSubmit = (numValue) => {
    rating.value = numValue;
    
    let ratings = dataEntryContext.ratings;
    ratings.push(rating);
    dataEntryContext.setRatings(ratings);
    
    props.navigation.navigate(props.nextScreen);
  };

  useLayoutEffect(() => {
    appContext.db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM rating_type WHERE type = ?;",
        [props.type],
        (tx, results) => {
          if (results.rows._array.length <= 0 || results.rows._array.length > 1) {
            alert('Something went wrong.');
          }

          rating.ratingTypeId = results.rows._array[0].id;
				},
				(tx, error) => {
					console.log(error);
					alert('Something went wrong.');
				}
      );
    });
  });

  return (
    <RatingEntry title={props.type} onClick={handleRatingSubmit.bind(this)} />
  );
};

export default RatingEntryScreen;