const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 3030;
const axios = require('axios');



app.use(express.static(__dirname + '/../public'));


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'public')));


app.get('/api/availability', (req, res) => {
  const id = req.query.id;
  const endpoint =  'http://3.140.156.174:3001/api/availability?id=' + id || `http://localhost:3001/api/availability/?id=${id}`
  axios.get(endpoint)
    .then(data => {
      res.status(200).json(data.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/api/workspace-description/:id', (req, res) => {

  const { id } = req.params;

  axios.get(`http://localhost:6060/api/workspace-description/${id}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/workspace-api/workspace/:id', (req, res) => {

  const { id } = req.params;

  axios.get(`http://localhost:4000/workspace-api/workspace/${id}`)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      console.log(err);
    });

});

app.get('/api/getNearbyTransitOptions/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://3.140.156.174:3002/api/getNearbyTransitOptions/' + id;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching nearby transit options: ${error}`);
    res.status(400).send('Unable to retrieve nearby transits');
  }
});

app.get('/api/nearbyworkspaces/buildings/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://ec2-54-177-170-134.us-west-1.compute.amazonaws.com:5001/api/nearbyworkspaces/buildings/'+ id || `http://localhost:5001/api/nearbyworkspaces/buildings/${id}`;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching nearby workspaces: ${error}`);
    res.status(400).send('Unable to retrieve nearby workspaces');
  }
});

app.get('/api/reviews/info/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://ec2-184-169-176-177.us-west-1.compute.amazonaws.com/api/reviews/info/' + id;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching reviews info: ${error}`);
    res.status(400).send('Unable to retrieve review info');
  }
});

app.get('/api/reviews/all/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://ec2-184-169-176-177.us-west-1.compute.amazonaws.com/api/reviews/all/' + id;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching reviews all: ${error}`);
    res.status(400).send('Unable to retrieve all reviews');
  }
});

app.get('/api/photos/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://54.151.43.93:6001/api/photos/' + id;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching photos: ${error}`);
    res.status(400).send('Unable to retrieve photos');
  }
});

app.get('/api/photos/workspace/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://54.151.43.93:6001/api/photos/workspace/' + id;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching workspaces photos: ${error}`);
    res.status(400).send('Unable to retrieve workspace photos');
  }
});

app.get('/amenities-api/amenity/:id', async (req, res) => {
  const { id } = req.params;
  const endpoint = 'http://54.219.57.231:4002/amenities-api/amenity/' + id;
  try {
    const { data } = await axios.get(endpoint);
    res.status(200).json(data);
  } catch(error) {
    console.log(`Error fetching amenities: ${error}`);
    res.status(400).send('Unable to retrieve amenities');
  }
});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});