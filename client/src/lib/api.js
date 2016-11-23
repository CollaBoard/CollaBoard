import $ from 'axios';

const API = {};

API.getBoard = function getBoard(uid) {
  return $.get(`/api/boards/${uid}`)
    .then(res => res.data);
};

API.createBoard = function createBoard(uid, name) {
  return $.post('/api/boards', { uid, name })
    .then(res => res.data);
};

API.getTeams = function getTeams() {
  return $.get('/api/teams')
  .then(res => res.data);
};

API.createTeam = function createTeam(teamName) {
  return $.post('/api/teams', { teamName })
    .then(res => res.data);
};

API.addToTeam = function addToTeam(uidTeam, uidUser) {
  return $.post('/api/teams', { uidTeam, uidUser })
    .then(res => res.data);
};

API.getMe = function getMe() {
  return $.get('/api/me')
  .then(res => res.data);
};

API.getMyBoards = function getMyBoards() {
  return $.get('/api/me/boards')
  .then(res => res.data);
};

API.getOneUser = function getOneUser(uid) {
  return $.get(`/api/users/${uid}`)
  .then(res => res.data);
};

API.getOneTeam = function getOneTeam(uid) {
  return $.get(`/api/teams/${uid}`)
  .then(res => res.data);
};

API.searchUsers = function searchUsers(query, uidTeam) {
  return $.get('/api/users', { query, uidTeam })
  .then(res => res.data);
};

// TESTING API CALLS // TESTING API CALLS // TESTING API CALLS
// TESTING API CALLS // TESTING API CALLS // TESTING API CALLS
// TESTING API CALLS // TESTING API CALLS // TESTING API CALLS

API.getMeTest = function getMeTest() {
  return new Promise((resolve) => {
    resolve({ name: 'Darion Freeman',
      avatar: 'http://i.imgur.com/Gved5aq.jpg',
      github_id: 'test-github-id',
      google_id: 'test-google-id',
      email: 'totallyatest@email.com',
      uid: 'darion01',
      username: 'totallyatest@email.com',
      boards: [
        {
          uid: '123e4567-e89b-12d3-a456-426655440001',
          name: 'Recent Board 1',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440002',
          name: 'Recent Board 2',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440002',
          name: 'Recent Board 3',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440002',
          name: 'Recent Board 4',
          thumbnail: 'https://placem.at/places?w=600',
        },
      ],
      teams: [
        {
          uid: '123e4567-e89b-12d3-a456-426655440000',
          name: 'Test team 1!',
          avatar: 'https://robohash.org/testTeam1',
          member_count: 3,
          board_count: 2,
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440001',
          name: 'Test team 2!',
          avatar: 'https://robohash.org/testTeam2',
          member_count: 10,
          board_count: 18,
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440002',
          name: 'Test team 3!',
          avatar: 'https://robohash.org/testTeam3',
          member_count: 1,
          board_count: 0,
        },
      ] });
  });
};

API.getMyBoardsTest = function getMyBoardsTest() {
  return new Promise((resolve) => {
    resolve({
      board_count: 4,
      boards: [
        {
          uid: '123e4567-e89b-12d3-a456-426655440001',
          name: 'My Board 1',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440002',
          name: 'My Board 2',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440003',
          name: 'My Board 3',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440004',
          name: 'My Board 4',
          thumbnail: 'https://placem.at/places?w=600',
        },
      ],
    });
  });
};

API.getOneTeamTest = function getOneTeamTest(uid) {
  console.log(`Fetching ${uid}`);
  return new Promise((resolve) => {
    resolve({
      uid: '123e4567-e89b-12d3-a456-426655440000',
      name: 'Test team!',
      avatar: 'https://robohash.org/testTeam1',
      member_count: 3,
      board_count: 2,
      boards: [
        {
          uid: '123e4567-e89b-12d3-a456-426655440001',
          name: 'Test Board 1',
          thumbnail: 'https://placem.at/places?w=600',
        },
        {
          uid: '123e4567-e89b-12d3-a456-426655440002',
          name: 'Test Board 2',
          thumbnail: 'https://placem.at/places?w=600',
        },
      ],
      members: [
        {
          uid: 'john01',
          name: 'John Smith',
          avatar: 'https://robohash.org/JohnSmith',
        },
        {
          uid: 'bob01',
          name: 'Bob Johnsam',
          avatar: 'https://robohash.org/BobJohnsam',
        },
        {
          uid: 'robert01',
          name: 'Robert Davenport',
          avatar: 'https://robohash.org/RobertDavenport',
        },
        {
          uid: 'sally01',
          name: 'Sally Whateverson',
          avatar: 'https://robohash.org/SallyWhateverson',
        },
      ],
    });
  });
};

API.searchUsersTest = function searchUsersTest(query) {
  console.log(`Fetching ${query}`);
  return new Promise((resolve) => {
    if (query === '3') {
      resolve([
        {
          uid: 'bob02',
          name: 'Bob Johnson',
          avatar: 'https://robohash.org/BobJohnson',
          display: 'add',
        },
        {
          uid: 'roger01',
          name: 'Roger Clementine',
          avatar: 'https://robohash.org/RogerClementine',
          display: 'add',
        },
        {
          uid: 'samantha01',
          name: 'Samantha Fortwell',
          avatar: 'https://robohash.org/SamanthaFortwell',
          display: 'add',
        },
      ]);
    } else {
      resolve([
        {
          uid: 'sally01',
          name: 'Sally Whateverson',
          avatar: 'https://robohash.org/SallyWhateverson',
          display: 'remove',
        },
        {
          uid: 'ellen01',
          name: 'Ellen Johnson',
          avatar: 'https://robohash.org/EllenJohnson',
          display: 'add',
        },
        {
          uid: 'bob03',
          name: 'Bob Rogers',
          avatar: 'https://robohash.org/BobRogers',
          display: 'add',
        },
        {
          uid: 'doug01',
          name: 'Doug Bartwell',
          avatar: 'https://robohash.org/DougBartwell',
        },
        {
          uid: 'mark01',
          name: 'Mark Dearson',
          avatar: 'https://robohash.org/MarkDearson',
          display: 'add',
        },
      ]);
    }
  });
};
// TESTING API CALLS // TESTING API CALLS // TESTING API CALLS
// TESTING API CALLS // TESTING API CALLS // TESTING API CALLS
// TESTING API CALLS // TESTING API CALLS // TESTING API CALLS

export default API;
