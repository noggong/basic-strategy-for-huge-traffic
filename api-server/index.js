import express from "express"
import cors from "cors"
import redisConnect from "./redisConnect.js";

const app = express()
app.use(cors())

function simpleProcess() {
    return "simple"
}

const heavyProcessResults = ["heavy1", "heavy2", "heavy3", "heavy4", "heavy5", "heavy6", "heavy7", "heavy8", "heavy9", "heavy10"]
let currentPointer = 0
let heavyProcessMustBe = heavyProcessResults[currentPointer]

setInterval(() => {
    // change heavyProocessMustBe every 3 seconds by currentPointer + 1
    currentPointer = currentPointer + 1
    if (currentPointer > 9) {
        currentPointer = 0
    }
    heavyProcessMustBe = heavyProcessResults[currentPointer]
    console.log("heavyProcessMustBe : ", heavyProcessMustBe)
}, 3000)
async function heavyProcess() {
    // look a side pattern
    const heavyResult = heavyProcessResults[currentPointer]
    const resultFromCache = await redisConnect.get("heavy")

    if (resultFromCache) {
        console.log("From Cache : ", resultFromCache)
        return resultFromCache
    }

    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            redisConnect.set("heavy", heavyResult)
            console.log("No Cache")
            resolve(heavyResult)
        }, 2000)
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
        if (result != heavyProcessResults[currentPointer]) {
            throw new Error("갱신 안됨")
        }
        return res.json({
            "data": result,
        })
    }catch (e) {
        return res.status(500).json({
            message: e.message
        })
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

