import { Router } from "express";
import { getAll, getUsers, removeUsers, setUsers, updateUsers } from "../controllers/redis_controller";
import client from "../config/redis_config";

const router = Router();

router.get("/all", getAll)
router.get("/", getUsers);
router.post("/", setUsers);
router.put("/", updateUsers);
router.delete("/", removeUsers);

router.get("/test", async (req, res, next)=>{
    try {
        // await Promise.all([
        //     client.set("a", 1),
        //     client.set("b", 2),
        //     client.set("c", 3)
        // ]).then((result)=>{
        //     console.log(result)
        // })

        // await Promise.allSettled([
        //     client.get("a"),
        //     client.get("b"),
        //     client.json.get("bike:0")
        // ]).then((result)=>{
        //     console.log(result)
        // })

        client.get("nn")
            .then(result=>{
                if(result){
                console.log(result)
                } else {
                    throw new Error("Key didn't match")
                }
            })
            .catch(err=>{
                console.log(err)
            })
        res.end()
    } catch (error) {
        console.log("catch error >>> ", error)
        next(error)
    }
})

export default router;