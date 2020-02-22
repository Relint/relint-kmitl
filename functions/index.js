/* eslint-disable callback-return */
/* eslint-disable promise/always-return */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express(); 

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));

const serviceAccount = require("./_config_fn/fbServiceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://relint-kmitl.firebaseio.com"
});

app.get('/reg', (req, res) => {
    let email = req.headers.email
    let password = req.headers.password
    let displayName = req.headers.username
    admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: displayName,
        disabled: false
    }).then(userRecord => {
        console.log('Succesfully created new user: ', userRecord);
        res.send(userRecord)
    }).catch(error => {
        console.log('Error creating new user: ', error);
        res.status(500).send(error)
    })
})

exports.app = functions.https.onRequest(app);
