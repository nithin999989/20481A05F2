const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());
app.get('/trains', async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const response = await axios.get('http://104.211.219.98/train/trains', {
      headers: {
        Authorization:  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODczMjY5MDcsImNvbXBhbnlOYW1lIjoiMjA0ODFBMDVGMiIsImNsaWVudElEIjoiODYyNDRkYmItNzVjMi00NTQwLTlmNmYtZDY5ZTkxYjA5OTQxIiwib3duZXJOYW1lIjoiIiwib3duZXJFbWFpbCI6IiIsInJvbGxObyI6IjIwNDgxQTA1RjItMiJ9.XtLdkRXx6eUdDHify4sOOZTRK3XrTecEg9koTf393y8
        ,
      },
    });
const trainSchedules = response.data;

    // Filter and sort the train schedules
    const filteredSchedules = trainSchedules.filter(
      (schedule) =>
        isTrainWithinNext12Hours(schedule.departureTime) &&
        !isTrainWithinNext30Minutes(schedule.departureTime)
    );

    const orderedSchedules = orderTrainSchedules(filteredSchedules);

    res.json(orderedSchedules);
  } catch (error) {
    console.error('Error fetching train schedules:', error.message);
    res.status(500).json({ error: 'Failed to fetch train schedules' });
  }
});
// Check if a train departure time is within the next 12 hours
function isTrainWithinNext12Hours(departu	reTime) {
  const now = new Date();
  const twelveHoursLater = new Date(now.getTime() + 12 * 60 * 60 * 1000);
  const trainDepartureTime = new Date(departureTime);

  return trainDepartureTime > now && trainDepartureTime < twelveHoursLater;
}

// Check if a train departure time is within the next 30 minutes
function isTrainWithinNext30Minutes(departureTime) {
  const now = new Date();
  const thirtyMinutesLater = new Date(now.getTime() + 30 * 60 * 1000);
  const trainDepartureTime = new Date(departureTime);

  return trainDepartureTime > now && trainDepartureTime < thirtyMinutesLater;
}

// Order the train schedules based on price, tickets, and departure time
function orderTrainSchedules(trainSchedules) {
  return trainSchedules.sort((a, b) => {
    // Compare prices (ascending order)
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;

    // Compare ticket availability (descending order)
    if (a.seatsAvailable > b.seatsAvailable) return -1;
    if (a.seatsAvailable < b.seatsAvailable) return 1;

    // Compare departure time (descending order)
    const departureA = new Date(a.departureTime);
    const departureB = new Date(b.departureTime);
    if (departureA > departureB) return -1;
    if (departureA < departureB) return 1;

    return 0;
  });
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
