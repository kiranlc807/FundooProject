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
export const userAuth= (req, res, next) => {
  // Get the token from the authorization header
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // verifing and Attach user information to the request
    const token_arr = token.split(" ");

    req.user = jwt.verify(token_arr.length>1?token_arr[1]:token_arr[0],process.env.LOGIN_SECRET_KEY);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};


export const resetAuth= (req, res, next) => {
  // Get the token from the authorization header
  const token = req.header('resetToken');

  // Check if token is present
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // verifing and Attach user information to the request
    req.user = jwt.verify(token,process.env.RESET_SECRET_KEY);
    console.log(req.user)

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

