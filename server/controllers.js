const axios = require('axios');

const createController = (endpoint, errorMessage) => async (req, res) => {

  const { id } = req.params;

  try {
    const { data } = await axios.get(endpoint + id)
    res.status(200).json(data);
  } catch (error) {
    console.log(`${error}`);
    res.status(400).send(`Unable to retrive ${errorMessage}`);
  }

}

const availability = (req, res) => {
  const id = req.query.id;
  const endpoint =  'http://3.140.156.174:3001/api/availability?id=' + id || `http://localhost:3001/api/availability/?id=${id}`
  axios.get(endpoint)
    .then(response => {
      const { data } = response
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
    });
};

const description = createController('http://54.151.43.93:6060/api/workspace-description/', 'workspace descriptions');
const workspace = createController('http://54.193.132.156:4000/workspace-api/workspace/', 'workspace');
const nearbyTransitOptions = createController('http://3.140.156.174:3002/api/getNearbyTransitOptions/', 'nearby transit options');
const nearbyWorkspaces = createController('http://ec2-54-177-170-134.us-west-1.compute.amazonaws.com:5001/api/nearbyworkspaces/buildings/', 'nearby workspaces');
const reviews = createController('http://ec2-184-169-176-177.us-west-1.compute.amazonaws.com/api/reviews/info/', 'review info');
const allReviews = createController('http://ec2-184-169-176-177.us-west-1.compute.amazonaws.com/api/reviews/all/', 'all reviews');
const photos = createController('http://54.151.43.93:6001/api/photos/', 'photos');
const workspacePhotos = createController('http://54.151.43.93:6001/api/photos/workspace/', 'workspace photos');
const amenities = createController('http://54.219.57.231:4002/amenities-api/amenity/', 'amenitites');

module.exports = {
  allReviews,
  amenities,
  availability,
  description,
  nearbyTransitOptions,
  nearbyWorkspaces,
  photos,
  reviews,
  workspace,
  workspacePhotos
};