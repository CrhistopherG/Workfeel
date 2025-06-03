import { Request, Response } from 'express';
export declare const getCompany: (req: Request, res: Response) => Promise<void>;
export declare const getCompanyById: (req: Request, res: Response) => Promise<void>;
export declare const createCompany: (req: Request, res: Response) => Promise<void>;
export declare const updateCompany: (req: Request, res: Response) => Promise<void>;
export declare const deleteCompany: (req: Request, res: Response) => Promise<void>;
