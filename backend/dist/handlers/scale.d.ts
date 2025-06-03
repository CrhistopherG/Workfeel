import { Request, Response } from "express";
export declare const getScales: (req: Request, res: Response) => Promise<void>;
export declare const getScaleById: (req: Request, res: Response) => Promise<void>;
export declare const getScalesByQuestion: (req: Request, res: Response) => Promise<void>;
export declare const createScale: (req: Request, res: Response) => Promise<void>;
export declare const updateScale: (req: Request, res: Response) => Promise<void>;
export declare const deleteScale: (req: Request, res: Response) => Promise<void>;
