/* eslint-disable */
import firebase from "firebase"
export const isOfflineForDatabase =  {
        online: false,
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    }
export const isOnlineForDatabase = {
        online: true,
        last_changed: firebase.database.ServerValue.TIMESTAMP,
    }