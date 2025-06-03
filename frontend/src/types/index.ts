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
    nullable,
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

export const DimensionSchema = object({
  dimension_id: number(),
  name: string(),
  description: string(),
  status: union([boolean(), string(), number()]), // Permitir múltiples tipos
  period_id: nullable(number()),
});

export const DraftDimensionSchema = object({
  name: string(),
  description: string(),
  status: boolean(),
  period_id: optional(number()),
});

// Esquema para una pregunta que viene del backend
export const QuestionSchema = object({
  question_id: number(),
  content: string(),
  dimension_id: number(),
});

// Esquema para crear una nueva pregunta
export const DraftQuestionSchema = object({
  content: string(),
  dimension_id: number(),
});

// Esquema para una pregunta que viene del backend
export const ScaleSchema = object({
  scale_id: number(),
  value: nullable(number()), // Puede ser null para opción múltiple
  description: string(),
  question_id: number(),
});

// Esquema para crear una nueva pregunta
export const DraftScaleSchema = object({
  value: nullable(number()), // Puede ser null para opción múltiple
  description: string(),
  question_id: number(),
});



// Arrays y tipos
export const UsersSchema = array(UserSchema);
export type User = InferOutput<typeof UserSchema>;

export const CompanysSchema = array(CompanySchema);
export type Company = InferOutput<typeof CompanySchema>;

export const DimensionsSchema = array(DimensionSchema);
export type Dimension = InferOutput<typeof DimensionSchema>;

export type Period = InferOutput<typeof PeriodSchema>;

// Lista de preguntas
export const QuestionsSchema = array(QuestionSchema);

// Tipos
export type Question = InferOutput<typeof QuestionSchema>;
export type DraftQuestion = InferOutput<typeof DraftQuestionSchema>;

//tipos de scale : 
export const ScalesSchema = array(ScaleSchema);
export type Scale = InferOutput<typeof ScaleSchema>;
