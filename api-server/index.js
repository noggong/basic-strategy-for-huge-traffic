import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

function simpleProcess() {
    return "simple"
}

app.get("/simple-api", (req, res) => {
    const result = simpleProcess()
    return res.json({
        "data": result,
    })
})


async function heavyProcess() {
    const result = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("heavy")
        }, 2000)
    })

    return result
}

app.get("/heavy-api", async (req, res) => {
    const result = await heavyProcess()
    return res.json({
        "data": result,
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

