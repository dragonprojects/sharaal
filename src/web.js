require('dotenv-safe').config();

const express = require('express');
const app = express();
app.disable('x-powered-by');
app.engine('twig', require('swig').renderFile);

require('dmiddlewares')(app, [
  express.static('www'),
]);

const contentful = require('dcontentful').createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});
const entryId = process.env.ENTRY_ID;

require('dcontrollers')(app, [
  require('./controller')({ contentful, entryId }),
]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
