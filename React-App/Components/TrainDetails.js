import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainDetails = ({ trainNumber }) => {
  const [train, setTrain] = useState(null);

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        const response = await axios.get(`http://104.211.219.98/train/trains/${trainNumber}`);
        setTrain(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrainDetails();
  }, [trainNumber]);

  if (!train) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Train Details</h2>
      <p>Train Name: {train.trainName}</p>
      <p>Departure Time: {train.departureTime}</p>
      <p>Seats Available (Sleeper): {train.seatsAvailable.sleeper}</p>
      <p>Seats Available (AC): {train.seatsAvailable.AC}</p>
      <p>Price (Sleeper): {train.price.sleeper}</p>
      <p>Price (AC): {train.price.AC}</p>
    </div>
  );
};

export default TrainDetails;
