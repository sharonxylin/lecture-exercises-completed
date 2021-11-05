import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let session = req.session;
  if(session.userid){
    req.send("The current logged in user is: " + session.userid);
  }else {
    res.send('ERROR: you must login to see user information');
  }
  res.send('respond with a resource');
});

router.post("/login", function(req, res, next) {
  if(req.session.userid){
    res.send("You're already logged in as " + req.session.userid + ". Please log out before logging in again.")
    return;
  }
  //check username and password
  if((req.body.username == "kylethayer" && req.body.password == "asdasd") || (req.body.username=="sharonxylin" &&req.body.password=="test1234")){
    //TODO: start a session
    let session = req.session;
    session.userid=req.body.username;
    console.log(req.session);
    res.send("you logged in as "+req.body.username+"!")
  } else{
    //not start session
    res.send("wrong login info")
  }
  
});

router.post("/logout", function(req, res, next){
  req.session.destroy();
  res.send("you logged out");
});

export default router;
