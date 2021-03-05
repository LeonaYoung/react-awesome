const express = require('express')
const app = express()
const getData = require('./getApi')
 
app.get('/user/list', function (req, res) {
  res.status(200);
  res.json(getData);
})
 
app.listen(3000, () => {
  console.log('listen on 3000')
})