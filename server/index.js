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
  axios.get(`http://localhost:3001/api/availability/?id=${id}`)
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
      console.log('error hit');
    })


});

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});