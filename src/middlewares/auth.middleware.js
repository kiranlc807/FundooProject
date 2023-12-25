import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
// export const userAuth = async (req, res, next) => {
//   try {
//     let bearerToken = req.header('Authorization');
//     if (!bearerToken)
//       throw {
//         code: HttpStatus.BAD_REQUEST,
//         message: 'Authorization token is required'
//       };
//     bearerToken = bearerToken.split(' ')[1];

//     const { user } = await jwt.verify(bearerToken, 'your-secret-key');
//     res.locals.user = user;
//     res.locals.token = bearerToken;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
export const userAuth= (req, res, next) => {
  // Get the token from the authorization header
  const token = req.header('Authorization');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'Kirana@4455');

    // Attach user information to the request
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

