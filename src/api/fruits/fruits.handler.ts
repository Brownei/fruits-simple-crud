import { data } from '../../../data';
import { NextFunction, Request, Response } from "express";
import { Fruits, Params } from "../../interfaces/Fruits";
import logger from "../../utils/logger";

export async function createFruit(req: Request<{}, {}, Fruits>, res:Response<Fruits | string>, next: NextFunction) {
    try {
        const { genus, name, family, order, nutritions } = req.body;

        if(!genus || !name || !family || !order || !nutritions.calories || !nutritions.carbohydrates || !nutritions.fat || !nutritions.protein || !nutritions.sugar) {
            res.status(404).json('Missing Data!');
        }

        if(!data) {
            res.status(404).json('No fruits!');
        }

        const existingData = data.find((i) => i.genus === genus || i.name === name);
        if(existingData) {
            res.status(404).json('Fruit already exists!');
        } else {

            data.unshift({
                name,
                genus,
                family,
                order,
                nutritions,
                id: data.length + 1,
            });
        
            res.status(200).json('Fruit Added!');
        }
    } catch (error) {
        logger.info('Error in the create');
        logger.error(error);
        next(error);
    }
}


export async function getAllFruits(req: Request, res:Response<Fruits[] | string>, next: NextFunction) {
    let fruits;
    try {
        if(!data) {
            res.status(404).json('No fruits!');
        }
        
        fruits = data;
    
        res.status(200).json(fruits);
    } catch (error) {
        logger.info('Error in the create');
        logger.error(error);
        next(error);
    }
}

export async function getOneFruit(req: Request<Params, {}, {}>, res:Response<Fruits | string>, next: NextFunction) {
    let fruit;
    try {
        const name = req.params.name;

        if(!name) {
            res.status(404).json('Name is required!');
        }

        if(!data) {
            res.status(404).json('No fruits!');
        }
        
        fruit = data.find((i) => i.genus === name || i.name === name);

        res.status(200).json(fruit);
    } catch (error) {
        logger.info('Error in the create');
        logger.error(error);
        next(error);
    }
}

export async function deleteFruit(req: Request<Params, {}, {}>, res:Response<Fruits[] | string>, next: NextFunction) {
    const { name } = req.params;

    try {
        if(!name) {
            res.status(404).json('Name is required!');
        }
    
        if(!data) {
            res.status(404).json('No fruits!');
        }
        
        data.filter((i) => i.genus === name || i.name === name);
    
        res.status(200).json(`Fruit: ${name} is deleted!`);
    } catch (error) {
        logger.info('Error in the create');
        logger.error(error);
        next(error);
    }
}