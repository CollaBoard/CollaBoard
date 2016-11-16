const webRTC = function webRTC(uid) {
  const connection = new RTCMultiConnection();
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  // until we set up our own signalling server, we can use this one ^
  // connection.socketMessageEvent = 'video-broadcast-demo';

  connection.session = {
    audio: true,
    video: true,
    oneway: true,
  };
  const videoContainer = document.getElementById('video-container');
  connection.onstream = function (e) {
    videoContainer.src = URL.createObjectURL(e.stream);
    videoContainer.play();
  };

  const socketId = uid;
  document.getElementById('open-or-join').onclick = function () {
    connection.openOrJoin(socketId);
  };
};

export default webRTC;