import React from 'react';
import { useParams } from 'react-router-dom';
import TrainDetails from '../components/TrainDetails';

const SingleTrainPage = () => {
  const { trainNumber } = useParams();

  return (
    <div>
      <h1>Single Train Page</h1>
      <TrainDetails trainNumber={trainNumber} />
    </div>
  );
};

export default SingleTrainPage;
