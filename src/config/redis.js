import {createClient} from 'redis';
export const client = createClient();

export const clientRedis = async ()=>{
    try{
        await client.connect();
        console.log("connected to Redis database");
    }catch(error){
        console.log("Redis database not connected");
    }
}