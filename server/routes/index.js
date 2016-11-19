const express = require('express');
const path = require('path');
const api = require('./api');
const authentication = require('./auth');

const router = express.Router();

//
// Static assets (html, etc.)
//
const assetFolder = path.resolve(__dirname, '../../client/public');
router.use(express.static(assetFolder));

// authentication middleware
router.use(authentication);

router.use('/api', api);

router.get('/*', (req, res) => {
  res.sendFile(`${assetFolder}/index.html`);
});

module.exports = router;
