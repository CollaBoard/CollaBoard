const express = require('express');
const api = require('./api');
const path = require('path');

const router = express.Router();

//
// Static assets (html, etc.)
//
const assetFolder = path.resolve(__dirname, '../../client/public');
router.use(express.static(assetFolder));

router.use('/api', api);

router.get('/*', (req, res) => {
  res.sendFile(`${assetFolder}/index.html`);
});

module.exports = router;
