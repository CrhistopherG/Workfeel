import { Request, Response } from 'express';
export declare const getDepartments: (req: Request, res: Response) => Promise<void>;
export declare const getDepartmentById: (req: Request, res: Response) => Promise<void>;
export declare const createDepartment: (req: Request, res: Response) => Promise<void>;
export declare const updateDepartment: (req: Request, res: Response) => Promise<void>;
export declare const deleteDepartment: (req: Request, res: Response) => Promise<void>;
