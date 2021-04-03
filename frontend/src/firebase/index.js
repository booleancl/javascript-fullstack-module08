import firebase from "firebase/app"
import "firebase/auth"
import config from "./config"

const firebaseApp = firebase.initializeApp(config)

const Auth = firebaseApp.auth()

export { Auth }

