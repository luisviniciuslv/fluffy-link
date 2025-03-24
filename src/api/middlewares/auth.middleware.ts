import jwt from 'jsonwebtoken';
import SECRET from '../../shared/constants/jwt';
import UserService from '../../domain/services/user.service';

export type GenerateJwtCallback = (
  error: Error | null,
  encoded: string | undefined
) => void;

const createAuthMiddleware = (userService: UserService) => {
  return async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token)
      return res
        .status(401)
        .json({ auth: false, message: 'No token provided.' });

    await jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(401);
      try {
        const user = await userService.getUser(decoded.id);
        req.headers['x-user-id'] = user._id;
        next();
      } catch {
        return res
          .status(401)
          .json({ auth: false, message: 'Failed to authenticate token.' });
      }
    });
  };
};

export default createAuthMiddleware;
