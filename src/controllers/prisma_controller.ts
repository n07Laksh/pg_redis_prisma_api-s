import { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma_db_config";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await prisma.product.findMany();
        console.log(result)
        res.status(200).json({ msg: "works find", result: result });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const postUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data } = req.body;

        const result = await prisma.product.create({ data: data })
        console.log(result)
        res.status(200).json({ msg: "Works perfect", result: result })
    } catch (error) {
        console.error(error);
        next(error)
    }
}

export const updateUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { data, id } = req.body;

        const result = await prisma.product.update({
            where: { id: id },
            data: data
        });
        console.log(result)
        res.status(200).json({ msg: "Works perfect", result: result })
    } catch (error) {
        console.error(error);
        next(error)
    }
};

export const delUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;

        const result = await prisma.product.delete({
            where: { id }
        });
        console.log(result)
        res.status(200).json({ msg: "Works perfect", result: result })
    } catch (error) {
        console.error(error);
        next(error)
    }
}