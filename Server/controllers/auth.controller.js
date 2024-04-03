import Users from "../models/users.js";
import passport from "passport";

export const registerUserController = async (req, res) => {
    const { username, password, email, name } = req.body;

    if (!username || !password || !email || !name) {
        res.status(400).json({ error: 'Por favor, complete todos los campos.' });
        return;
    }

    try {
        const user = await Users.create(username, password, email, name);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const loginUserController = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log(req.session);
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
}

export const logoutUserController = async (req, res) => {
    req.logout();
    res.redirect('/');
}