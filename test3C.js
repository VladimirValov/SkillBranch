import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
    console.log("pc закачан");
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

const app = express();
app.use(cors());

app.get('/test3A', function(req, res) {
  res.json(pc);
  console.log(pc);

});
//{"C:":"41943040B","D:":"16777216B"}
app.get('/test3A/volumes', function(req, res) {


  let volumeInfo = {};

  for(let i = 0; i <pc.hdd.length; i++) {

    if(volumeInfo[pc.hdd[i].volume]) {
      volumeInfo[pc.hdd[i].volume] += pc.hdd[i].size;
      console.log(i + " " + pc.hdd[i].volume);
    }
    else
    volumeInfo[pc.hdd[i].volume] = pc.hdd[i].size;
  }

  for (let key in volumeInfo) {
    volumeInfo[key] = volumeInfo[key] + "B";
  }

  console.log(volumeInfo);
  res.json(volumeInfo);

  console.log(pc.hdd);


})

app.get('/test3A/:id', function(req, res) {
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc[param]);
  console.log(req.params.id);

})

app.get('/test3A/board/:id', function(req, res) {
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc.board[param]);
  console.log(req.params.id);

})

app.get('/test3A/ram/:id', function(req, res) {
  console.log(req.baseUrl);
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc.ram[param]);
  console.log(req.params.id);
})


app.get('/test3A/os/:id', function(req, res) {
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc.os[param]);
  console.log(req.params.id);
})


app.get('/test3A/floppy/:id', function(req, res) {
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc.floppy[param]);
  console.log(req.params.id);
})

app.get('/test3A/hdd/:id', function(req, res) {
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc.hdd[param]);
  console.log(req.params.id);
})

app.get('/test3A/monitor/:id', function(req, res) {
  let param = req.params.id;
  console.log("param = " + param);

  res.json(pc.monitor[param]);
  console.log(req.params.id);
})


app.listen(3000, function() {
  console.log('Example app listaning on port 3000!')
});

function userName(url) {

};


