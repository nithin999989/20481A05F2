import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get('http://104.211.219.98/train/trains/');
        setTrains(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div>
      <h2>All Trains</h2>
      <ul>
        {trains.map((train) => (
          <li key={train.trainNumber}>
            {train.trainName} - Departure Time: {train.departureTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
