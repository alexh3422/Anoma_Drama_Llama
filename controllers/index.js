
const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const postsRoutes = require('./postsRoutes');
const frontEndRoutes = require('./frontEndRoutes');


router.use('/api/users', userRoutes);
router.use('/api/posts', postsRoutes);
router.use('/', frontEndRoutes);

module.exports = router;