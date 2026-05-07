import { Request, Response, NextFunction } from "express";
import pool, { getClient } from "../config/pg_config";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = "SELECT * FROM cars";
        const result = await pool.query(query)
        // console.log(result)
        res.status(200).json({ msg: "pg query is working fine", result: result.rows })
    } catch (error) {
        console.log("CATCH BLOCK ERROR >>> ", error)
        next(error)
    }
}

export const addCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, model, year, price } = req.query;

        const query = `INSERT INTO cars (name, model, year, price) VALUES ($1, $2, $3, $4) RETURNING *`; // RETURNING is used to return the inserted data
        const result = await pool.query(query, [name, model, year, price]);
        // console.log(result)
        res.status(200).json({ msg: "pg query is working fine", result: result })
    } catch (error) {
        console.log("CATCH BLOCK ERROR >>> ", error)
        next(error)
    }
}

export const getCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query;

        const query = "select * from cars where name = $1";
        const result = await pool.query(query, [name]);
        // console.log(result)
        res.status(200).json({ msg: "pg query is working fine", result: result.rows })
    } catch (error) {
        console.log("CATCH BLOCK ERROR >>> ", error)
        next(error)
    }
}

export const updateCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { identifierColumn = "name", identifierName, ...newValues } = req.body;

        if (!identifierName || Object.keys(newValues).length === 0) {
            return res.status(400).json({ msg: "Invalid input" });
        }

        let fields = Object.keys(newValues)
            .map((key, index) => `${key} = $${index + 2}`)
            .join(", "); // return eg - 'name = $2, year = $3'



        /* the final query is
        'UPDATE cars SET name = bmw, year = 2020 WHERE model = M8 RETURNING *';
        */
        const query = `
            UPDATE cars
            SET ${fields}
            WHERE ${identifierColumn} = $1
            RETURNING *
        `

        const result = await pool.query(query, [identifierName, ...Object.values(newValues)]); // only pass the values with ...Objec.values(newValues)
        res.status(200).json({ msg: "pg query is working fine", result: result.rows })
    } catch (error) {
        console.log("CATCH BLOCK ERROR >>> ", error)
        next(error)
    }
}

export const removeCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.query;

        const query = "DELETE FROM cars WHERE name=$1 RETURNING *";
        const result = await pool.query(query, [name]);
        // console.log(result)
        res.status(200).json({ msg: "pg query is working fine", result: result.rows })
    } catch (error) {
        console.log("CATCH BLOCK ERROR >>> ", error)
        next(error)
    }
}