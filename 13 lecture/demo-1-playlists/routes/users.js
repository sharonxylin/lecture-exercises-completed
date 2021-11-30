import mongoose from "mongoose";
import express from 'express';
var router = express.Router();

main().catch(err => console.log(err));

let User;
let Playlist;

async function main() {
  //Run mongo db locally with a command like:
  // mongod.exe --dbpath="c:\code\mongodbData\testdb"
  await mongoose.connect('mongodb+srv://sharonxylin:info441test1234@cluster0.oanzb.mongodb.net/lecture13?retryWrites=true&w=majority');

  //TODO: Add schemas and models
  const userSchema = mongoose.Schema({
    username: String,
    favorite_bands:[String]
  });
  const playlistSchema = mongoose.Schema({
    title: String,
    songs: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
  })

  User = mongoose.model('User', userSchema);
  Playlist = mongoose.model('Playlist', playlistSchema);
}

// Add a user
router.post('/', async function(req, res, next) {
  let username = req.body.name;
  let newUser = new User({
    username: username,
    favorite_bands:  []
  });
  let response = await newUser.save();
  res.json({status: "success"});
});

// get json data for all users
router.get('/', async function(req, res, next) {
  let allUsers = await User.find();
<<<<<<< HEAD
  /*allUsers.map(userInfo => {
    userInfo.id = userInfo._id
    return userInfo;
  });*/
  res.json(allUsers);
});

//delte
router.delete('/', async function(req, res, next) {
  let userID = req.body.userID
  let deletedUserInfo = await User.deleteOne({_id: userID});
  // need to delete playlists as well

  res.json({status: "success"});
});

//add band
router.post('/addBand', async function(req, res, next) {
  //favorite_bands 
  let user = await User.findById(req.body.userID);
  user.favorite_bands.push(req.body.band);
  let saveResponse = await user.save();
  res.json({status: "success"});
})

//add playlist
router.post('/addPlaylists', async function(req, res, next) {
  let newPlaylist = new Playlist({
    title: req.body.title,
    songs: req.body.songs,
    user: req.body.userID
  })

  let saveresponse = await newPlaylist.save();

  res.json({status: "success"});
})

router.get('/playlists', async function(req, res, next) {
  let userID = req.query.user;
  let allPlaylists = await Playlist.find({user: userID}).exec();
  res.json(allPlaylists);
});


export default router;
