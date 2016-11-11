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


app.get('/test3A/:id1?/:id2?/:id3?', function(req, res) {
  console.log(req.originalUrl);
  console.log("id1 = " + req.params.id1);
  console.log("id2 = " + req.params.id2);
  console.log("id3 = " + req.params.id3);

  console.log( "Проверка на корректнось" );
  if (req.params.id1 && pc[req.params.id1] === undefined) {
    console.log(1);
    return res.status(404).send('Not found');
  }
  if ( req.params.id2 && !pc[req.params.id1][req.params.id2]) {
    console.log(2);
    return res.status(404).send('Not found');
  }
  if ( req.params.id3 && !pc[req.params.id1][req.params.id2][req.params.id3]){
    console.log(3);
    return res.status(404).send('Not found');
  }
  console.log( "Проверка на корректнось пройдена" );

  if(req.params.id1 && req.params.id2 && req.params.id3) {
    
    console.log(pc[req.params.id1][req.params.id2][req.params.id3]);
    return res.json(pc[req.params.id1][req.params.id2][req.params.id3]);
  }
  if(req.params.id1 && req.params.id2) {
    
    console.log(pc[req.params.id1][req.params.id2]);
    return res.json(pc[req.params.id1][req.params.id2]);
  }
  if(req.params.id1) {
   return res.json(pc[req.params.id1]);
  }

  console.log(pc);
  res.json(pc);
});

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
  console.log(pc.hdd);

  res.json(volumeInfo);
});

app.listen(3000, function() {
  console.log('Example app listaning on port 3000!')
});
