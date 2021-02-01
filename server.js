const path = require('path');
const config = require('config');
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const cors = require('cors');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const errorHandler = require('./middleware/error');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const ErrorResponse = require('./utils/errorResponse');
const { isImageValid } = require('./utils/validation/imageValidation');

const categoriesRoute = require('./routes/common/categories');
const productsRoute = require('./routes/products');
const cartRoute = require('./routes/shopping/cart');
const cartItemRoute = require('./routes/shopping/cartItem');
const orderRoute = require('./routes/shopping/order');
const citiesRoute = require('./routes/cities');

const { BAD_REQUEST } = require('./constValues/httpStatusCodes');
const { MAX_FILE_UPLOAD_SIZE_IN_BYTES } = require('./utils/validation/constants');

const UPLOADS_DIR = '.' + path.sep + config.get('uploadsFolder');

const WEEK = 1000 * 60 * 60 * 24 * 7;
const baseUrl = config.get('baseUrl');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

const database = config.get('dbName');
const user = config.get('username');
const password = config.get('password');
const host = config.get('host');

const options = {
  host,
  port: 3306,
  user,
  password,
  database
};
const sessionStore = new MySQLStore(options);

// Body Parser Middleware 
app.use(express.json());

// Control where uploaded images will be stored.
const fileStorage = multer.diskStorage({  
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR)  // UPLOADS_DIR is a target folder for images on the server
  },
  filename: (req, file, cb) => {
    // Create custom file name
    cb(null, `${uuidv4()}-${file.originalname.toLowerCase().split(' ').join('-')}`);
  }
});
const fileFilter = (req, file, cb) => {
  const errors = [];
  if (isImageValid(file, errors)) {
    cb(null, true); // first param is an error, true => save file
  } else {
      return cb(new ErrorResponse(`${errors.join('')}`, BAD_REQUEST), false);
    }
}
app.use(multer({ 
  storage: fileStorage,
  fileFilter,
  limits: {fileSize: MAX_FILE_UPLOAD_SIZE_IN_BYTES}
}).single('image'));
// The session ID is stored inside of the cookie. The cookie then gets sent with every request to our server and our session middleware uses the ID from the cookie to find the user's session/data.
app.use(session({
  name: config.get('sess_name'),
  secret: config.get('sess_secret'),
  resave: false,
  saveUninitialized: false,
  store: sessionStore,   // Add persistent Session storage to application so that restarting server doesn't log all users out.
  cookie: { 
    secure: false,
    maxAge: WEEK,
    httpOnly: true,
    path: `${baseUrl}/`
    // sameSite: true
  },
}));

app.use(`${baseUrl}/api/users`, usersRoute);
app.use(`${baseUrl}/api/users/auth`, authRoute);
app.use(`${baseUrl}/api/categories`, categoriesRoute);
app.use(`${baseUrl}/api/products`, productsRoute);
app.use(`${baseUrl}/api/shopping/cart`, cartRoute);
app.use(`${baseUrl}/api/shopping/cartItem`, cartItemRoute);
app.use(`${baseUrl}/api/orders`, orderRoute);
app.use(`${baseUrl}/api/cities`, citiesRoute);

// Middleware that catches errors - should be at the end (just before) get('/')
app.use(errorHandler);

// Set static folder
app.use(`${baseUrl}/${config.get('uploadsFolder')}`, express.static(path.join(__dirname, config.get('uploadsFolder'))));
// Serve static assets in production == serve Angular in production
if (process.env.NODE_ENV === 'production') {
  app.use(`${baseUrl}/`, express.static(path.join(__dirname, 'client', 'dist', 'client')));

  app.get(`${baseUrl}/*`, (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'client','index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
