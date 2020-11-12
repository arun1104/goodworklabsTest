'use strict';
const constants = require('./../utils/constants');
class CommonUtility{
  constructor(){
    this.rootFolderPath = constants.METADATA_ROOT_FOLDER;
    this.getFileLocation = this.getFileLocation.bind(this);
  }

  getFileLocation(module, file){
    return [
      __dirname,
      constants.METADATA_RELATIVE_PATH_FROM_CONTROLLERS,
      constants.PUBLIC_FOLDER,
      constants.SRC_FOLDER,
      constants.UI_CONFIG_FOLDER,
      constants.SPECIFICATION_FOLDER,
      module,
      `${file}.${constants.JSON_FILE_TYPE}`,
    ];
  }
}

module.exports = new CommonUtility();
