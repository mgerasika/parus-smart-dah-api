/* eslint-disable no-undef */
const functions = require("firebase-functions");
const app = require('./lib/app');
exports.app = functions.https.onRequest(app);
