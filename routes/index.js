var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')


function readDirectoryRecursively(directoryPath) {
  const folder = {
    name: path.basename(directoryPath),
    contents: [],
  };

  const files = fs.readdirSync(directoryPath, { withFileTypes: true });

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file.name);

    if (file.isDirectory()) {
      const subFolder = readDirectoryRecursively(filePath);
      folder.contents.push(subFolder);
    } else {
      const fileObject = {
        name: file.name,
      };
      folder.contents.push(fileObject);
    }
  });

  return folder;
}



/* GET home page. */
router.get('/', function (req, res, next) {
  var folder = readDirectoryRecursively('./userFiles')
  res.render('index', { folder });
});







module.exports = router;
