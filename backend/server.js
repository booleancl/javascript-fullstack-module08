const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const environment = process.env.NODE_ENV;
const port = process.env.PORT || 3000;

const app = express();

app.use(cors({
  origin: 'http://localhost:8080'
}))

app.use("/api", (request, response, next)=>{
 const headerToken = request.headers.authorization;

 if (!headerToken) {
   return response.status(401).json({ message: "No token provided" });
 }
 
 const [authorizationType, tokenValue] = headerToken.split(" ");

 if (headerToken && authorizationType.toLowerCase() !== "bearer") {
   return response.status(401).json({ message: "Invalid token" });
 }

  admin
   .auth()
   .verifyIdToken(tokenValue)
   .then(() => next())
   .catch(() => response.status(403).json({ message: "Could not authorize" }));
})

app.use("/api/products", (request, response) =>{
  return response.status(200).json([
    { name:'Acme Product', id: '00001'}
  ])
})

app.listen(port,()=>{
  console.log(`App server listening in mode ${environment} on port ${port}`)
})