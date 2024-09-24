require("dotenv").config();


const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fs = require("fs");
const { cours, utilisateurs } = require("./data");
const session = require('express-session')
const bcrypt = require('bcrypt')

const app = express();

app.engine("html", ejs.__express);

app.use(session({
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  secret : process.env.SESSION_SECRET ,
  cookie: {
    maxAge: 1000 * 60 * 60 *24*7,
    secure: false,
  }
}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));

const protectionRoute = (req , res , next) =>{
  if(!req.session.idUtilisateur){
    res.redirect("/connexion")
  }else{
    next()
  }
}


app.use((req, res, next)=>{
  const  {idUtilisateur} = req.session
  if(idUtilisateur){
    res.locals.utilisateur = utilisateurs.find((utilisateur)=>utilisateur.id === idUtilisateur)
  }
  next();
})


app.get("/", (req, res) => {
  const {utilisateur} = res.locals
  res.render("index", { cours , utilisateur});
});
app.get("/connexion", (req, res) => {
  res.render("connexion");
});

app.post("/connexion" , async(req , res)=>{
  const {email, password} = req.body;
  if(email && password) {
    const utilisateur = utilisateurs.find((utilisateur)=>utilisateur.email===email)
    if(utilisateur){
      const validPw = await bcrypt.compare(password , utilisateur.password)

      if(validPw){
        req.session.idUtilisateur= utilisateur.id
        return res.render("index" , {cours})
      }else{
        console.log("Mot de passe incorrect")
      }
    }else{
      console.log("Utilisateur n'existe pas");
    }
  }

  res.redirect("/connexion")

})


app.get("/inscription", (req, res) => {
  res.render("inscription");
});

app.post("inscription" , async(req , res)=> {
  const {nom , email , password} = req.body;
if(nom && email  && password){
  const utilisateur = utilisateurs.some((utilisateur)=>utilisateur.email === email);
  if(!utilisateur){
    const salt = await bcrypt.genSalt(10)
    const pwToSave = await bcrypt.hash(password , salt)

    let nouvelUtilisateur = {
      id: utilisateurs.length +1,
      nom, email,
      password: pwToSave
    }
    utilisateurs.push(nouvelUtilisateur);
    req.session.idUtilisateur = nouvelUtilisateur.id;
    return res.render("index", {cours , utilissateur: nouvelUtilisateur})
  }

}
res.redirect("/inscription")
})
app.get("/lectureVideo", protectionRoute , (req, res) => {
  const {utilisateur} = res.locals
  res.render("lectureVideo" , {utilisateur});
});


app.post("/deconnexion" , (req, res)=> {
  req.session.destroy((err)=>{
    if(err){
      return res.render("index" , {cours})
    }
    res.clearCookie(process.env.SESSION_NAME);
    return res.render('index', {cours})
  })
})

app.get("/video", (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Require Range header");
  }
  const videoPath = "public/videos/drcmind_intro.mp4";
  const videoSize = fs.statSync("public/videos/drcmind_intro.mp4").size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": "bytes " + start + "-" + end + "/" + videoSize,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});

app.listen(4001);
console.log("L'application tourne au port 4001");
