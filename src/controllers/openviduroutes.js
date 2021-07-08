
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { response } = require('../server');
const axios = require("axios");

const OPENVIDU_URL = "https://meetcrescendo.me"
const OPENVIDU_SECRET = "meet"

var request = require('request');
const { json } = require('express');

router.post('/create', auth(), (req, res, next) => {
  
  var data = JSON.stringify({
  "mediaMode": "ROUTED",
  "recordingMode": "MANUAL",
  "forcedVideoCodec": "VP8",
  "defaultRecordingProperties": {
    "name": "MyRecording",
    "hasAudio": true,
    "hasVideo": true,
    "outputMode": "COMPOSED",
    "recordingLayout": "BEST_FIT",
    "resolution": "1280x720",
    "frameRate": 25,
    "shmSize": 536870912
  },
  "customSessionId": req.body.customSessionId
});

var config = {
  method: 'post',
  url: `${OPENVIDU_URL}/openvidu/api/sessions`,
  headers: { 
    'Authorization': `Basic ${Buffer.from('OPENVIDUAPP:' + OPENVIDU_SECRET).toString('base64')}`, 
    'Content-Type': 'application/json', 
  },
  data : data
};

axios(config)
.then(function (response) {
  //console.log(JSON.stringify(response.data));
 
  res.status(200).send(response.data.id);
})
.catch(function (error) {
  console.log(JSON.stringify(error));
  if (error.response.status==409){
    res.status(200).send(req.body.customSessionId)
  }
});

});

router.post('/connect/:id', auth(), (req, res) => {
  const customSessionId = req.params.id

var data = JSON.stringify({
  "type": "WEBRTC",
  "data": "My Server Data",
  "record": true,
  "role": "PUBLISHER",
  "kurentoOptions": {
    "videoMaxRecvBandwidth": 1000,
    "videoMinRecvBandwidth": 300,
    "videoMaxSendBandwidth": 1000,
    "videoMinSendBandwidth": 300,
    "allowedFilters": [
      "GStreamerFilter",
      "ZBarFilter"
    ]
  }
});

var config = {
  method: 'post',
  url: `${OPENVIDU_URL}/openvidu/api/sessions/${customSessionId}/connection`,
  headers: { 
    'Authorization': `Basic ${Buffer.from('OPENVIDUAPP:' + OPENVIDU_SECRET).toString('base64')}`, 
    'Content-Type': 'application/json', 
  },
  data : data
};

axios(config)
.then(function (response) {
  res.status(200).send(response.data.token);
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

});

module.exports = router;

