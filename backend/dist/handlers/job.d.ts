import { Request, Response } from 'express';
export declare const getJobs: (req: Request, res: Response) => Promise<void>;
export declare const getJobById: (req: Request, res: Response) => Promise<void>;
export declare const createJob: (req: Request, res: Response) => Promise<void>;
export declare const updateJob: (req: Request, res: Response) => Promise<void>;
export declare const deleteJob: (req: Request, res: Response) => Promise<void>;
