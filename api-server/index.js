import express from "express"
import cors from "cors"
import redisConnect from "./redisConnect.js";

const app = express()
app.use(cors())

function simpleProcess() {
    return "simple"
}

async function heavyProcess() {
    // look a side pattern
    try {
        const resultFromCache = await redisConnect.get("heavy")
        if (resultFromCache) {
            return resultFromCache
        }
    } catch (e) {
        console.error("Redis Error", e)
    }

    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("no-cache")
            reject("no-cache")
        }, 100)
    })

    return result
}

app.get("/simple-api", (req, res) => {
    const result = simpleProcess()
    return res.json({
        "data": "simple",
    })
})

app.get("/heavy-api", async (req, res) => {
    try {
        const startTime = new Date().getTime()
        const result = await heavyProcess()
        const endTime = new Date().getTime()
        console.log("Time : ", endTime - startTime)

        return res.json({
            "data": result,
        })
    }catch (e) {
        console.error("Error", e.message)
        return res.status(500).json({
            message: e.message
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

