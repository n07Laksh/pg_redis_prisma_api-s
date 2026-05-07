import express, {Request, Response, NextFunction} from "express";
import { test1 } from "../controllers/auth";

const router = express.Router();

router.get("/", test1)

export default router;