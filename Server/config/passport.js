import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import { pool } from './db.js';

passport.use(new LocalStrategy(
    async function(username, password, done) {
      try {
        console.log('entra local startegy');
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = rows[0];
        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }
      } catch (err) {
        return done(err);
      }
    }
));

passport.serializeUser((user, done) => {
    done(null, user.user_id, user.username);
  });
  
passport.deserializeUser(async (id, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
      const user = rows[0];
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  