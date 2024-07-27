/*
  Server for testing purposes
  
  ENV variables are not hidden in this version
*/

const express = require('express')
const cors = require('cors')
const spotifyWebApi = require('spotify-web-api-node')

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const credentials = {
  clientId: 'e29c42098c514b629146ede7a125fdb6',
  clientSecret: '4c7c5c884cfc4702a5c5e0441f2b238b',
  redirectUri: 'http://localhost:3000/',
};

app.get('/', (req, res) => {
  console.log('hi server')
})

app.post('/login', async (req,res) => {
    try {
      const spotifyApi = new spotifyWebApi(credentials)
      const auth = req.body.auth

      const { body } = await spotifyApi.authorizationCodeGrant(auth);
    
      const accessToken = body.access_token;

      spotifyApi.setAccessToken(accessToken);

      res.json({
        accessToken,
      });

    } catch (e) {
      console.log(e);
      res.sendStatus(400)
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})