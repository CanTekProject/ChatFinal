require('dotenv').config();
const express = require('express');
const app = express();
const User = require('./models/user');
const accountController = require('./controllers/accountController');
const LocalStrategy = require('passport-local');
const logout = require('express-passport-logout');
const port = process.env.PORT || 4000;
const passport = require('passport');
const cors = require('cors');
const http = require('http');
const session = require('express-session'); // Import express-session

const server = http.createServer(app);
const socketIO = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use(session({ // Use express-session middleware
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
}));

require('./middleware/auth.js')(passport);

const mongoose = require('mongoose');
const mongoString = process.env.MONGODB_URL || 'mongodb+srv://CanTek:CanTek123@cantekcluster.uujud7m.mongodb.net/?retryWrites=true&w=majority';

console.log('MONGODB_URL:', mongoString);

mongoose
  .connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());

app.get('/', (req, res) => {
  res.send('Introduction JWT Auth');
});

app.get('/profile', passport.authenticate('jwt', { session: false }), accountController.profile);
app.post('/login', passport.authenticate('local', { session: false }), accountController.login);
app.post('/register', accountController.register);

app.get('/logout', function (req, res) {
  logout();
  console.log('Logged out');
  res.status(200).json({ message: 'Logged out' });
});

app.use(passport.session());
app.use(passport.initialize());

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    console.log(data);
    socketIO.emit('messageResponse', data);
  });

  // Listens when a new user joins the server
  socket.on('newUser', (data) => {
    // Adds the new user to the list of users
    users.push(data);
    // Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

  socket.on('logout', () => {
    console.log('🔥: A user logged out');
    socket.disconnect();
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    // Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    // Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});

server.listen(port, () => {
  console.log(`Listening on *:${port}`);
});
