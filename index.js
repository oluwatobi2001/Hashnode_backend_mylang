const express = require("express");
const app = express();
const {GoogleGenerativeAI} = require("@google/generative-ai")
const dotenv = require("dotenv")
const cors = require("cors")
app.use(cors());

app.use(express.json());
dotenv.config();
console.log(process.env)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)
app.get("/", (req, res) => {
    res.send("Hello , World")
})
app.post("/google-ai", async(req, res)=> {
    console.log(req.body);
    console.log(req)
    const model = genAI.getGenerativeModel({model : "gemini-1.5-flash"});
    const prompt= `help translate  only( no interpretation) this to ${req.body.lang} ${req.body.text}`
    const result = await model.generateContent(prompt);
    console.log(prompt)
    const response = await result.response;
    const text = response.text();
    res.status(200).json(text);
    console.log(text)
})

app.listen(process.env.PORT || 5000, ()=> {
    console.log("hello");
})


