import {createClient} from "redis";

const client = await createClient({
    url: "redis://127.0.0.1:6379",
})
    .on('error', err => console.log('Redis Client Error', err))
    .connect();

export default client