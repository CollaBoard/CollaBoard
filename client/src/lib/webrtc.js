const webRTC = function webRTC(uid) {
  const connection = new RTCMultiConnection();
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  // until we set up our own signalling server, we can use this one ^
  connection.socketMessageEvent = 'video-broadcast-demo'; // ???
  connection.session = {
    audio: false,
    video: true,
    oneway: true,
  };
  const videoContainer = document.getElementById('video-container');
  connection.onstream = function (event) {
    videoContainer.src = URL.createObjectURL(event.stream);
    videoContainer.play();
  };

  const socketId = uid;
  document.getElementById('open-or-join').onclick = function () {
    connection.openOrJoin(socketId);
  };
};

export default webRTC;
