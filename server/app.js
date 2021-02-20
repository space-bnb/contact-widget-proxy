const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const {
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
} = require('./controllers');

app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/buildings/:workspaceId', express.static(path.join(__dirname, '../', 'public')));


app.get('/api/availability', availability);
app.get('/api/workspace-description/:id', description);
app.get('/workspace-api/workspace/:id', workspace);
app.get('/api/getNearbyTransitOptions/:id', nearbyTransitOptions);
app.get('/api/nearbyworkspaces/buildings/:id', nearbyWorkspaces);
app.get('/api/reviews/info/:id', reviews);
app.get('/api/reviews/all/:id', allReviews);
app.get('/api/photos/:id', photos);
app.get('/api/photos/workspace/:id', workspacePhotos);
app.get('/amenities-api/amenity/:id', amenities);

module.exports = app;