import express from "express";
import morgan from "morgan";
import session from 'express-session';
import cors from 'cors';

// Passport
import "./config/passport.js";
import passport from 'passport';

// Enviroments
import { PORT } from "./config/enviroments.js";
import { pool } from "./config/db.js";

// Routes
import routerAuth from './routes/auth.routes.js';
import routerPayment from './routes/payment.routes.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

//Passport
app.use(passport.initialize());
app.use(passport.session());


// Test database connect 
pool.connect()
    .then(() => console.log('Database connected'))
    .catch(err => console.error('Error connecting to database', err.stack));


// Routes
app.use(routerAuth);
app.use(routerPayment);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
