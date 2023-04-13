import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv/config";
import Stripe from "stripe";
import router from "./routes/pmtRoute.js";

const stripe = new Stripe(process.env.STRIPESECRET);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
//const stripe = process.env.STRIPESECRET;

//Since we are using one router, we,ll use one

//post request 
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is up and running in PORT: ${PORT}`);
});
