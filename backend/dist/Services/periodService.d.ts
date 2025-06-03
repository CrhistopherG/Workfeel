import Period from "../models/Period.model";
import { CreatePeriodDTO } from '../DTO/CreatePeriodDTO';
import { UpdatePeriodDTO } from '../DTO/UpdatePeriodDTO';
export declare const getPeriodById: (userId: string, periodId: any) => Promise<Period>;
export declare const getPeriodsByUserId: (userId: string) => Promise<Period[]>;
export declare const createPeriod: (userId: string, periodData: CreatePeriodDTO) => Promise<Period>;
export declare const deletePeriod: (userId: string, periodId: string) => Promise<void>;
export declare const updatePeriod: (userId: string, periodId: string, data: UpdatePeriodDTO) => Promise<Period>;
