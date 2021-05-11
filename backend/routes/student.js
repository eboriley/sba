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
    const students = [];
    db.collection('student').get()
    .then((querySnapShot) => {
        querySnapShot.forEach((doc) => {
            students.push({
                id: doc.id,
                data: doc.data()
            })
        })
        res.status(200).json(students)
    }).catch((err) => {
        console.error('Could not load document: ', err);
    })
})

router.route('/add').post((req,res) => {
    const studentRef = db.collection('student');
    studentRef.add({
        st_name: req.body.st_name,
        st_class: req.body.st_class,
        dob: req.body.dob,
        status: req.body.status,
        timestamp: req.body.timestamp
    }).then((docRef) => {
        console.log("Document written with ID: ", docRef);
    }).then(() => res.json('score added'))
    .catch((err) => {
        console.error("Could not add exams: ", err);
    })
})

module.exports = router;