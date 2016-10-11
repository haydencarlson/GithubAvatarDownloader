require("dotenv").config();
var request = require('request');
var fs = require('fs');
var repoO = process.argv[2];
var repoN = process.argv[3];

var searchOptions = {
  url: "https://api.github.com/repos/" + repoO + "/" + repoN + "/contributors",
  path: "/",
  headers: {
    'User-Agent': 'heydoon'
  },
  auth: {
    user: process.env.USERNAME,
    pass: process.env.CLIENT_KEY
  }
}

request(searchOptions, function(error, response, body) {
  if (error) {
    console.log("Error occurred:" +  " " + error);
  } else {
    console.log(response.statusCode);

    var data = JSON.parse(body);
    for (var i = 0; i < data.length; i++) {
      downloadImageByURL(data[i].avatar_url, "./avatars/" + data[i].login);
    }
  }
});

function downloadImageByURL (url, filePath) {

  request(url, {encoding: 'binary'}, function(error, response, body) {
    var getExtension = response.headers['content-type'].split('/')[1];
    fs.writeFile(filePath + "." + getExtension, body, 'binary', (err) => {
      if (err) throw err;
      console.log("Saved to:" + filePath);
    });
  });
}
