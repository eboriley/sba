const express = require('express');
const cors = require('cors');
const router = express.Router();
const firebase = require('firebase');

require('firebase/firestore');

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

const firebaseConfig = {
    apiKey: "AIzaSyAZc4KIjneN6aEOGE0aQC5iRUCYkqy1hME",
    authDomain: "abmock-7c3eb.firebaseapp.com",
    projectId: "abmock-7c3eb",
    storageBucket: "abmock-7c3eb.appspot.com",
    messagingSenderId: "309716927556",
    appId: "1:309716927556:web:d99e6cdfcdf3c7106de811",
    measurementId: "G-BRLBSVVDXT"
  };

  firebase.initializeApp({
      apiKey: firebaseConfig.apiKey,
      authDomain: firebaseConfig.authDomain,
      projectId: firebaseConfig.projectId
  })

  router.use(function timeLog (req, res, next) {
      console.log('Time: ', Date.now())
      next()
  }) 

  const scoresRouter = require('./routes/scores');
  const studentRouter = require('./routes/student')

  app.use('/scores', scoresRouter);
  app.use('/students', studentRouter);

  app.listen(5000, () => {
      console.log("Server is running on port 5000")
  });
