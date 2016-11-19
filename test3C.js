import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

//let pc = {"board":{"vendor":"IBM","model":"IBM-PC S-100","cpu":{"model":"80286","hz":12000},"image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg","video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"},"ram":{"vendor":"CTS","volume":1048576,"pins":30},"os":"MS-DOS 1.25","floppy":0,"hdd":[{"vendor":"Samsung","size":33554432,"volume":"C:"},{"vendor":"Maxtor","size":16777216,"volume":"D:"},{"vendor":"Maxtor","size":8388608,"volume":"C:"}],"monitor":null,"length":42,"height":21,"width":54};

let pc = {};

fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
    console.log("pc закачан успешно");
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

const checkUrl = function (path) {

  let arrPath = path.split("/");	 	
	
  let result = arrPath.reduce( (prev, current, index)=>{
	console.log( index + " параметр" );
	console.log( current );
		
	if(current == "") return prev;
	
	if(prev === undefined) return undefined;
	
	if( current == "length" && (Array.isArray(prev)|| typeof(prev) == "string") ) 
		return undefined;
		
	console.log( prev [current]);	
	return prev[current];
	}, pc);
	
	return result	
}

const app = express();
app.use(cors());

app.get('/test3A', function(req, res) {
  res.json(pc);
 });

app.get('/test3A/volumes', function(req, res) {
  let volumeInfo = {};
  
  pc.hdd.forEach(function (hdd) {
	volumeInfo[hdd.volume] = (volumeInfo[hdd.volume] || 0) + hdd.size;
  });
  
  for (let key in volumeInfo) {
    volumeInfo[key] = volumeInfo[key] + "B";
  }
  
  console.log(volumeInfo);
  res.json(volumeInfo);
});

app.get('/test3A/*', function(req, res) {
  console.log( req.originalUrl );
  
  let answer = checkUrl(req.originalUrl.substring(8)) ;
  
  if (answer === undefined )
	res.status(404).send("Not Found");
  
  res.json(answer);

});

app.listen(3000, function() {
  console.log('Example app listaning on port 3000!')
});
