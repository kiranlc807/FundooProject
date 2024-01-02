import {client} from '../config/redis'
import HttpStatus from "http-status-codes"

export const cacheMiddleware = async(req, res, next)=>{
        const cacheKey = req.user.userId;
    try {
        const cachedData = await client.get(cacheKey);
        if (cachedData) {
            return res.json({
                code: HttpStatus.OK,
                data: JSON.parse(cachedData),
                message: 'Data retrieved from cache'
              });
        }
        next()
      } catch (error) {
        next();
        console.error('Error retrieving data from cache', error.message);
     } 
};