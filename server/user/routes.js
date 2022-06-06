const express = require('express');
const upload = require('./upload');
const routers = express.Router();


// routers.post('/uploads', upload.single('photo'), (req, res, next) => {
//     console.log('Success', req.file);
//     return res.send({
//         link: 'http://localhost:3000/uploads/' + req.file.filename,
//     });
// });

// module.exports = routers;