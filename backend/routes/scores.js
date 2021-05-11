const router = require('express').Router();
const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore')

const db = firebase.firestore();

router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
});



router.route('/').get((req,res) => {
    const scores = [];
    db.collection('exams').get()
    .then((querySanapShot) => {
        querySanapShot.forEach((doc) => {
            scores.push({
                id: doc.id,
                data: doc.data()
            })
        })
        res.status(200).json(scores)
    }).catch((err) => {
        console.error('Could not load document: ', err);
    })
})

router.route('/student').get((req,res) => {
    const scores = [];
    db.collection('exams').where('st_id', '==' , 'L1TWc5ln1urXxkkptaXa').get()
    .then((querySanapShot) => {
        querySanapShot.forEach((doc) => {
            scores.push({
                id: doc.id,
                data: doc.data()
            })
        })
        res.status(200).json(scores)
    }).catch((err) => {
        console.error('Could not load document: ', err);
    })
})

router.route('/:id').get((req,res) => {
    const scores = [];
    db.collection('exams').where('sem_id', '==' , req.params.id).get()
    .then((querySanapShot) => {
        querySanapShot.forEach((doc) => {
            scores.push({
                id: doc.id,
                data: doc.data()
            })
        })
        res.status(200).json(scores)
    }).catch((err) => {
        console.error('Could not load document: ', err);
    })
})
router.route('/students/:id').get((req,res) => {
    const scores = [];
    db.collection('exams').where('st_id', '==' , req.params.id).get()
    .then((querySanapShot) => {
        querySanapShot.forEach((doc) => {
            scores.push({
                id: doc.id,
                data: doc.data()
            })
        })
        res.status(200).json(scores)
    }).catch((err) => {
        console.error('Could not load document: ', err);
    })
})

router.route('/add').post((req,res) => {
   const examsRef = db.collection('exams');
   examsRef.add({
       exams: req.body.exams,
       exercise: req.body.exercise,
       groupWork: req.body.groupWork,
       homework: req.body.homework,
       project: req.body.project,
       sem_id: req.body.sem_id,
       st_id: req.body.st_id,
       st_name: req.body.st_name,
       subject: req.body.subject,
       timestamp: req.body.timestamp
   }).then((docRef) => {
       console.log("Document written with ID: ", docRef);
   }).then(() => res.json('score added'))
   .catch((err) => {
       console.error("Could not add exams: ", err);
   })
})


router.route('/:id').delete((req,res) => {
    db.collection('exams').doc(req.params.id).delete()
    .then(() => res.status(204).send('Teacher deleted successfully'))
    .catch(function (error){
        res.status(500).send(error);
    })
})


router.route('/:id').put( async (req,res) => {
await db.collection('exams').doc(req.params.id).set(req.body,{merge: true})
.then(() => res.json({id:req.params.id}))
.catch((error) => res.status(500).send(error))

})

module.exports = router;