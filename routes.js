'use strict';

const metadataHandler = require('./controllers/metadata');
module.exports = {
  getMetadata: metadataHandler.getMetadataHandler,
}