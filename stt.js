const express = require('express');
const app = express();
const morgan = require('morgan')
const cors = require("cors");
const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');

function stt(input) {
  return new Promise(function (resolve, reject) {
    var audio = input
    var request = require('request');
    var options = {
      'method': 'POST',
      'url': 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/2c86099d-5a2e-4191-a375-797ec3d1b2d6/v1/recognize?model=es-ES_BroadbandModel',
      'headers': {
        'Content-Type': 'audio/mp3',
        'Authorization': 'Basic YXBpa2V5OnBGdWs2V2REaDFxckdJeFVXQXY1NXFqREFOVGQzdmlsa1AzdVZDc1ZqVUdq'
      },
      body: audio,

    };

    request(options, function (error, response) {

      if (error) throw new Error(error);

      var resp = JSON.parse(response.body)
      var final = []

      for (let i in resp.results) {
        final[i] = resp.results[i].alternatives[0].transcript
      }

      final = JSON.stringify(final)
      final = final.replace(/\\"/g, " ");
      final = final.replace(/,/g, " ");

      //resp.results[0].alternatives[0].transcript
      console.log(final)
      return resolve(final)
    });


  });
}

module.exports = stt;
