const HLSServer = require('hls-server')
const http = require('http')

console.log('creating hls server')
const server = http.createServer()
const hls = new HLSServer(server, {
  path: '/streams',     // base URI to output HLS streams
  dir: 'public/videos'  // directory that input files are stored
})

const ffmpeg = require('fluent-ffmpeg')

// host, port, and path to the RTMP stream
const host = 'localhost'
const port = '1935'
const stream_name = 'sylvester'
const path = `/live/${stream_name}`

// https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/blob/master/examples/livertmp2hls.js

// TODO create rtmp server to save flv files locally
// check these files. If signature is correct, give flv files as input
// to ffmpeg
ffmpeg('rtmp://'+host+':'+port+path, { timeout: 432000 })
  // set video bitrate
  .videoBitrate(1024)
  // set h264 preset
  .addOption('preset','superfast')
  // set target codec
  .videoCodec('libx264')
  // set audio bitrate
  .audioBitrate('128k')
  // set audio codec
  .audioCodec('libopus')
  // set number of audio channels
  .audioChannels(2)
  // set hls segments time
  .addOption('-hls_time', 10)
  // include all the segments in the list
  .addOption('-hls_list_size',0)
  // setup event handlers
  .on('end', function() {
    console.log('file has been converted succesfully');
  })
  .on('error', function(err) {
    console.log('an error happened: ' + err.message);
  })
  // save to file
  .save(`public/videos/${stream_name}/output.m3u8`);

server.listen(8000)
