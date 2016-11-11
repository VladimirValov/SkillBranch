import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());

app.get('/test2C', function(req, res) {
  console.log(req.query);
  res.send( userName(req.query) );
})

app.listen(3000, function() {
  console.log('Example app listaning on port 3000!')
});

function userName(url) {
  console.log(url.username);

  let user = url.username.match(/[\w\-]+\.[\w\-]+\/@?(\w+\.?\w+)/);
  console.log(user);
  if (user == null) {
    user = url.username.match(/(\w+\.?\w+)/);
  }
   return("@" + user[1]);
};

