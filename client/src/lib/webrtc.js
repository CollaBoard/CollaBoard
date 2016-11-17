const webparty = function webparty(uid) {
  const connection = new RTCMultiConnection(null, {
    useDefaultDevices: true,
  });
  connection.enableScalableBroadcast = true;
  connection.maxRelayLimitPerUser = 1;
  connection.autoCloseEntireSession = true;
  // connection.socketURL = '/';
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  connection.socketMessageEvent = 'scalable-media-broadcast-demo';
// document.getElementById('broadcast-id').value = connection.userid;
// user need to connect server, so that others can reach him.
  connection.connectSocket((socket) => {
    // this event is emitted when a broadcast is already created.
    socket.on('join-broadcaster', (hintsToJoinBroadcast) => {
      console.log('join-broadcaster', hintsToJoinBroadcast);
      connection.session = hintsToJoinBroadcast.typeOfStreams;
      connection.sdpConstraints.mandatory = {
        OfferToReceiveVideo: !!connection.session.video,
        OfferToReceiveAudio: !!connection.session.audio,
      };
      connection.broadcastId = hintsToJoinBroadcast.broadcastId;
      connection.join(hintsToJoinBroadcast.userid);
    });
    socket.on('rejoin-broadcast', (broadcastId) => {
      console.log('rejoin-broadcast', broadcastId);
      connection.attachStreams = [];
      socket.emit('check-broadcast-presence', broadcastId, (isBroadcastExists) => {
        if (!isBroadcastExists) {
                // the first person (i.e. real-broadcaster) MUST set his user-id
          connection.userid = broadcastId;
        }
        socket.emit('join-broadcast', {
          broadcastId,
          userid: connection.userid,
          typeOfStreams: connection.session,
        });
      });
    });
    socket.on('broadcast-stopped', (broadcastId) => {
        // alert('Broadcast has been stopped.');
        // location.reload();
      console.error('broadcast-stopped', broadcastId);
      alert('This broadcast has been stopped.');
    });
    // this event is emitted when a broadcast is absent.
    socket.on('start-broadcasting', (typeOfStreams) => {
      console.log('start-broadcasting', typeOfStreams);
        // host i.e. sender should always use this!
      connection.sdpConstraints.mandatory = {
        OfferToReceiveVideo: false,
        OfferToReceiveAudio: false,
      };
      connection.session = typeOfStreams;
        // "open" method here will capture media-stream
        // we can skip this function always; it is totally optional here.
        // we can use "connection.getUserMediaHandler" instead
      connection.open(connection.userid, () => {
            // showRoomURL(connection.sessionid);
        console.log('connection open', connection.userid);
      });
    });
  });
  const videoContainer = document.getElementById('video-container');
  connection.onstream = (event) => {
    if (connection.isInitiator && event.type !== 'local') {
      return;
    }
    if (event.mediaElement) {
      event.mediaElement.pause();
      delete event.mediaElement;
    }
    connection.isUpperUserLeft = false;
    videoContainer.src = URL.createObjectURL(event.stream);
    videoContainer.play();
    videoContainer.userid = event.userid;
    if (event.type === 'local') {
      videoContainer.muted = true;
    }
    if (connection.isInitiator === false && event.type === 'remote') {
        // he is merely relaying the media
      connection.dontCaptureUserMedia = true;
      connection.attachStreams = [event.stream];
      connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: false,
      };
      const socket = connection.getSocket();
      socket.emit('can-relay-broadcast');
      if (connection.DetectRTC.browser.name === 'Chrome') {
        connection.getAllParticipants().forEach((p) => {
          if (`${p}` !== `${event.userid}`) {
            const peer = connection.peers[p].peer;
            peer.getLocalStreams().forEach((localStream) => {
              peer.removeStream(localStream);
            });
            peer.addStream(event.stream);
            connection.dontAttachStream = true;
            connection.renegotiate(p);
            connection.dontAttachStream = false;
          }
        });
      }
      if (connection.DetectRTC.browser.name === 'Firefox') {
            // Firefox is NOT supporting removeStream method
            // that's why using alternative hack.
            // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
            // need to ask all deeper nodes to rejoin
        connection.getAllParticipants().forEach((p) => {
          if (`${p}` !== `${event.userid}`) {
            connection.replaceTrack(event.stream, p);
          }
        });
      }
    }
  };
  document.getElementById('open-or-join').onclick = () => {
    const broadcastId = uid;
    connection.session = {
      audio: false,
      video: true,
      oneway: true,
    };
    const socket = connection.getSocket();
    socket.emit('check-broadcast-presence', broadcastId, (isBroadcastExists) => {
      if (!isBroadcastExists) {
            // the first person (i.e. real-broadcaster) MUST set his user-id
        connection.userid = broadcastId;
      }
      console.log('check-broadcast-presence', broadcastId, isBroadcastExists);
      socket.emit('join-broadcast', {
        broadcastId,
        userid: connection.userid,
        typeOfStreams: connection.session,
      });
    });
  };
};

export default webparty;
