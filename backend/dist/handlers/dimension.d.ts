import { Request, Response } from 'express';
export declare const getDimensions: (req: Request, res: Response) => Promise<void>;
export declare const getDimensionById: (req: Request, res: Response) => Promise<void>;
export declare const createDimension: (req: Request, res: Response) => Promise<void>;
export declare const updateDimension: (req: Request, res: Response) => Promise<void>;
export declare const deleteDimension: (req: Request, res: Response) => Promise<void>;
export declare const getActiveDimensions: (req: Request, res: Response) => Promise<void>;
