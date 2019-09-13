const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
let gfs;
// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, {  promiseLibrary: require('bluebird') })
  .then(
    () =>
      {
        console.log(`Connected to database ${config.database}`);
      }
    )
    .catch((err) => console.log(`Database error: ${err}`));

const app = express();
const users = require('./routes/users');
const categories = require('./routes/category');
const insurers = require('./routes/insurer');
const package = require('./routes/package');
const hospital = require('./routes/hospitals');
const userPackage = require('./routes/userPackage');
const docs = require('./routes/docs');
const notification = require('./routes/notification');
const userClaims = require('./routes/userClaims');
const hospitalPoc = require('./routes/hospitalPoc');
// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/category', categories);
app.use('/insurer',insurers);
app.use('/package',package);
app.use('/hospital',hospital);
app.use('/userPackage',userPackage);
app.use('/docs',docs);
app.use('/notification',notification);
app.use('/userClaims',userClaims);
app.use('/hospitalPoc',hospitalPoc);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
