const webRTC = function webRTC(uid, socket) {
  const connection = new RTCMultiConnection();
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  // until we set up our own signalling server, we can use this one ^

  connection.session = {
    audio: true,
    video: true,
    oneway: true,
  };
  const videoContainer = document.getElementById('video-container');
  connection.onstream = function onstream(e) {
    videoContainer.src = URL.createObjectURL(e.stream);
    videoContainer.play();
  };

  const socketId = uid;
  document.getElementById('display-video-chat').addEventListener('click', () => {
    connection.openOrJoin(socketId, (joined) => {
      if (joined) {
        // joined the video chat
        console.log('you joined the video chat');
      } else {
        // started the video chat
        console.log('you started the video chat');
        socket.emit('video chat started');
      }
    });
  });
};

export default webRTC;
