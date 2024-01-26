import express from "express"
import cors from "cors"
import redisConnect from "./redisConnect.js";

const app = express()
app.use(cors())

function simpleProcess() {
    return "simple"
}

app.get("/simple-api", (req, res) => {
    const result = simpleProcess()
    return res.json({
        "data": "simple",
    })
})


async function heavyProcess() {
    // look a side pattern
    const resultFromCache = await redisConnect.get("heavy")

    if (resultFromCache) {
        console.log("From Cache : ", resultFromCache)
        return resultFromCache
    }

    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            redisConnect.set("heavy", "heavy")
            console.log("No Cache")
            resolve("heavy")
        }, 2000)
    })

    return result
}

app.get("/heavy-api", async (req, res) => {
    const startTime = new Date().getTime()
    const result = await heavyProcess()
    const endTime = new Date().getTime()
    console.log("Time : ", endTime - startTime)

    return res.json({
        "data": result,
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

