import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser"
import router from "./api/api";
import cors from "cors"




const app: Express = express();
const port = process.env.PORT || 3000;





app.use(BodyParser.urlencoded({extended:true}))
app.use(BodyParser.json())
app.use(cors())
app.use('/', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});