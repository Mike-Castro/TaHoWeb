import { sequelize } from '../../db/index.js';
import { User } from '../../db/models.js';

class UserController {
    register() {
        return async (req, res) => {
            const { firstName, lastName, phone, username, password } = req.body;
            if (!firstName || !lastName || !phone || !username || !password) {
                return res
                    .status(400)
                    .json({ error: 'All fields are required!' });
            }
            const passwordPattern = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!passwordPattern.test(password)) {
                return res.status(400).json({
                    error: 'Password does not follow the requirements!',
                });
            }
            const hashedPassword = await User.hashPassword(password);
            let user;
            try {
                user = await sequelize.transaction(async (t) => {
                    const user = await User.create(
                        {
                            firstName,
                            lastName,
                            phone,
                            username,
                            password: hashedPassword,
                        },
                        { transaction: t },
                    );
                    return user;
                });
            } catch (error) {
                console.log(error);
                return res.status(400).json({
                    error: 'Username unavailable. Try a different one.',
                });
            }
            const token = await user.generateToken();
            res.cookie('authcookie', token);
            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user,
            });
        };
    }

    login() {
        return async (req, res) => {
            const { username, password } = req.body;
            const user = await User.findOne({ where: { username } });
            console.log(user);
            if (!user) {
                return res.status(401).json({
                    error: 'Try again. Username has not been found.',
                });
            }
            const matches = await user.comparePassword(password);
            if (!matches) {
                return res.status(401).json({
                    error: 'Try again. Username and password do not match.',
                });
            }
            const token = await user.generateToken();
            res.cookie('authcookie', token);
            res.status(201).json({
                success: true,
                message: 'Login successful',
                user,
            });
        };
    }

    logout() {
        return async (req, res) => {
            const user = await User.findByPk(req.userId);
            user?.update({ token: '' });
            res.clearCookie('authcookie');
            res.status(200).json({
                success: true,
                message: 'Logout successful',
            });
        };
    }

    isLoggedIn() {
        return async (req, res) => {
            const user = await User.findByPk(req.userId);
            if (user !== null) {
                res.status(201).json({
                    success: true,
                    message: 'Active session',
                    user,
                });
            } else {
                // Only happens when clearing the DB
                res.sendStatus(401);
            }
        };
    }
}

export default new UserController();