import { Router } from "express";
import { delUsers, getUsers, postUsers, updateUsers } from "../controllers/prisma_controller";

const router = Router();

router.get("/", getUsers);
router.post("/", postUsers);
router.put("/", updateUsers);
router.delete("/", delUsers);

export default router;