import { Router } from "express";
import { addCar, getAll, getCar, removeCar, updateCar } from "../controllers/postgres_controller";

const router = Router();

router.get("/allcars", getAll);
router.post("/", addCar);
router.get("/", getCar);
router.put("/", updateCar);
router.delete("/", removeCar);

export default router;