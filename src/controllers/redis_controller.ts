import { Request, Response, NextFunction } from "express";
import client from "../config/redis_config";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let cursor = "0"
        let value = [];

        do {
            const result = await client.scan(cursor);
            cursor = result.cursor;

            for (let keys of result.keys) {
                let type = await client.type(keys);
                value.push(await getValue(keys, type))
            }
        } while (cursor !== "0")

        res.status(200).json({ msg: "All keys/values fetch successfully", result: value })
    } catch (error) {
        console.log("catch error >>> ", error)
        next(error)
    }
}

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { key } = req.body;
        const type = await client.type(key)
        const result = await getValue(key, type)
        // console.log(result)
        res.status(200).json({ msg: "get user router is working fine", result: result })
    } catch (error) {
        console.log("catch error >>> ", error)
        next(error)
    }

}

export const setUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { key, type, body } = req.body;
        let valType = getKeyType(type)
        let result = await client[valType](key, body);
        // console.log(result)
        res.status(200).json({ msg: "set users works", result: result })
    } catch (error) {
        console.log("catch error >>> ", error)
        next(error)
    }

}

export const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { key, type, body } = req.body;

        let keyType = type === 'list' ? "lSet" : getKeyType(type);
        
        // let result = await client.lSet(key, 0, body); // for list update we need three args
        let result = await client[keyType](key, body);
        // console.log(result);
        res.status(200).json({ msg: "user updated successfully", result: result })
    } catch (error) {
        console.log("catch error >>> ", error)
        next(error)
    }
}

export const removeUsers = async (req: Request, res: Response, next: NextFunction) => {
    const { key } = req.body;
    console.log(req.body)
    try {
        let result = await client.del(key);
        console.log(result);
        res.status(200).json({ msg: "cache removed successfully", result: result })
    } catch (error) {
        console.log("catch error >>> ", error)
        next(error)
    }
}



// Utility functions

export async function getValue(key: string, type: string) {
    let value;
    try {
        switch (type) {
            case "string":
                value = await client.get(key);
                break;

            case "hash":
                value = await client.hGetAll(key);
                break;

            case "list":
                value = await client.lRange(key, 0, -1);
                break;

            case "set":
                value = await client.sMembers(key);
                break;

            // case "zset":
            //     value = await client.zRange(key, 0, -1, { WITHSCORES: true });
            //     break;

            default:
                value = null;
        }
        return { [key]: value }
    } catch (error) {
        const err = error instanceof Error ? error.message : String(error)
        throw new Error(err);
    }
}

function getKeyType(type: string) {
    switch (type) {
        case "string":
            return "set";

        case "hash":
            return "hSet";

        case "list":
            return "lPush";

        case "set":
            return "sAdd";

        case "json":
            return "json.set";

        default:
            return "set";
    }
}