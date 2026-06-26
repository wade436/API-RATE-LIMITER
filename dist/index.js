import express from 'express';
const port = process.env.PORT;
const app = express();
app.post("/consume", (req, res) => { });
app.post("/check", (req, res) => { });
app.get("/:key", (req, res) => { });
app.listen(port, (() => console.log(`listening on port ${port}`)));
