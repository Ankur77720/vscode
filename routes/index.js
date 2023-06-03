var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')


function readDirectoryRecursively(directoryPath) {
  const folder = {
    name: path.basename(directoryPath),
    path: directoryPath,
    contents: [],
  };
  const files = fs.readdirSync(directoryPath, { withFileTypes: true });

  // Loop over directories and add them to the `contents` array
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file.name);
    if (file.isDirectory()) {
      const subFolder = readDirectoryRecursively(filePath);
      folder.contents.push(subFolder);
    }
  });

  // Loop over files and add them to the `contents` array
  files.forEach((file) => {
    const filePath = path.join(directoryPath, file.name);
    if (file.isFile()) {
      const fileObject = {
        name: file.name,
        path: path.join(directoryPath, file.name)
      };
      folder.contents.push(fileObject);
    }
  });

  return folder;
}



router.get('/', function (req, res, next) {
  var folder = readDirectoryRecursively('./userFiles')
  res.render('index', { folder });
});


router.get('/openFile/*', (req, res, next) => {
  fs.readFile(`./${req.params[ 0 ]}`, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        status: "Internal server error",
        message: "data you send is not correct cannot procced with this data",
      })
    }
    res.status(200).json({
      fileData: data
    })
  })
})


/* GET home page. */








module.exports = router;
