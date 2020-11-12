'use strict';
const Logger = require('../utils/logger');
const moduleRegistry = require('./moduleRegistry');
const commonUtils = require('../utils/common');
const fs = require('fs');
const path = require('path');
const constants = require('../utils/constants');

class Metadata{
  constructor(){
    this.fs = fs;
    this.getMetadataHandler = this.getMetadataHandler.bind(this);
  }

  async getMetadataHandler(req, res){
    const correlationId = req.correlationId();
    const logger = new Logger(correlationId, 'getMetadataHandler', 'Metadata');
    logger.info('Entry');
    try {
      let module = req.swagger.params.module.value;
      let screen = req.swagger.params.screen.value;
      let moduleDirectory = moduleRegistry[module];
      let fileLocation = commonUtils.getFileLocation(moduleDirectory, screen);
      let filePath = path.join(...fileLocation);
      let rawdata = this.fs.readFileSync(filePath);
      if (rawdata){
        try {
          let result = JSON.parse(rawdata);
          res.status(constants.HTTP_STATUS_OK).send(result);
        } catch (err){
          logger.error(err);
          let errObj = {
            status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
            message: constants.INVALID_JSON};
          throw errObj;
        }
      } else {
        logger.error(constants.NO_CONTENT);
        let errObj = {
          status: constants.HTTP_STATUS_INTERNAL_SERVER_ERROR,
          message: constants.NO_CONTENT};
        throw errObj;
      }
    } catch (err){
      logger.error(err);
      if (!err.status){
        err.status = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
        err.message = constants.FILE_NOT_FOUND;
      }
      res.status(err.status).send({message: err.message});
    }
  }
}

module.exports = new Metadata();
