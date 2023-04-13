import express  from "express";
import { charge, paymentIntent } from "../controllers/pmtController.js";

const router = express.Router();

router.post("/checkout",charge);

export default router;