const app = require('./app.js')
const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});