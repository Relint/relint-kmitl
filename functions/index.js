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

admin.initializeApp(functions.config().firebase);

function checkAuth(req, res, next) {
    if (req.headers.authtoken) {
        next();
        admin.auth().verifyIdToken(req.headers.authtoken)
            .then(() => {
                next();
            }).catch(() => {
                res.status(403).send('Unauthorized');
            });
    } else {
        res.status(403).send('Unauthorized');
    }
}

 app.use('/auth', checkAuth)

app.get('/auth', (req, res) => {
    res.json({
        message: 'Hello World!'
    })
})

exports.app = functions.https.onRequest(app);
