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

const db = admin.firestore();
const rtdb = admin.database();
// app.get('/something', (request, response) => ...)

exports.app = functions.https.onRequest(app);
