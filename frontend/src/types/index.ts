import { 
    number, 
    object, 
    string, 
    InferOutput, 
    array, 
    union, 
    null_, 
    boolean, 
    date, 
    optional, 
    nullable 
} from "valibot";

// User Schemas
export const DraftUserSchema = object({
    name: string(),
    password: string(),
    email: string(),
    rol_id: number()
});

export const UserSchema = object({
    user_id: number(),
    name: string(),
    password: string(),
    email: string(),
    rol_id: number(),
    company_id: union([number(), null_()])
});

// Company Schemas
export const DraftCompanySchema = object({
    name: string(),
    address: string(),
    email: string(),
    credits: number()
});

export const CompanySchema = object({
    company_id: number(),
    name: string(),
    address: string(),
    email: string(),
    credits: number()
});

// Period Schema
export const PeriodSchema = object({
    period_id: number(),
    name: string(),
    status: boolean(),
    date_start: date(),
    date_end: date(),
    company_id: number()
});

// Dimension Schemas
export const DimensionSchema = object({
    dimension_id: number(),
    name: string(),
    description: string(),
    period_id: nullable(number())
});

export const DraftDimensionSchema = object({
    name: string(),
    description: string(),
    status: boolean(),
    period_id: optional(number())
});

// Arrays y tipos
export const UsersSchema = array(UserSchema);
export type User = InferOutput<typeof UserSchema>;

export const CompanysSchema = array(CompanySchema);
export type Company = InferOutput<typeof CompanySchema>;

export const DimensionsSchema = array(DimensionSchema);
export type Dimension = InferOutput<typeof DimensionSchema>;

export type Period = InferOutput<typeof PeriodSchema>;