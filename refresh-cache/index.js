import redisConnect from "./redisConnect.js";

setInterval(() => {
    redisConnect.set("heavy", "heavy", {
        EX: 20,
        NX: true,
    })
    console.log("refresh cache")
}, 3000)
