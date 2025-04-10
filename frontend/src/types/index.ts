import { number, object, string, InferOutput, array, union, null_, boolean} from "valibot";


export const DraftUserSchema = object({
    name: string(),
    password: string(),
    email: string()
})

export const UserSchema = object({
    user_id: number(),
    name: string(),
    password: string(),
    email: string(),
    rol_id: number(),
    company_id: union([number(), null_()])
})

//exportamos los valores de nuestro company backend
export const DraftCompanySchema=object({
    name: string(),
    address: string(),
    email: string(),
    credits: number()
})

//datos del frontend
export const CompanySchema=object({
    company_id: number(),
    name: string(),
    address: string(),
    email: string(),
    credits: number(),
})

//exportamos los valores de nuestro scale
export const DrafScaleSchema = object({
    scale_id: number(),
    value: number(),
    description: string()
})

//mostraremos los valores del scale frontend
export const ScaleSchema = object({
    scale_id: number(),
    value: number(),
    description: string()
})

//mostraremos los valores de nuestro dimension del frontend
export const DimensionSchema = object({
    dimension_id: number(),
    name: string(),
    description: string(),
    status: boolean()
})

//mostraremos los valores de nuestro dimension del backend
export const DraftDimensionSchema = object({
    dimension_id: number(),
    name: string(),
    description: string(),
    status:boolean(),
    period_id:number()
})


//mostraremos los valores de nuestro preguntas en el frontend 
export const QuestionSchema= object({
    question_id:number(),
    content:string(),
    dimension_id:number()
})

//mostraremos nuestro valores de preguntas en el backend
export const DrafQuestionSchema=object({
    queston_id:number(),
    content:string(),
    dimension_id:number()

})

//mostraremos los valores de nuestro periodos en el frontend
export const PeriodSchema=object({
    period_id:number(),
    name:string(),
    status:boolean(),
    date_start:string(),
    date_end:string()
})

//mostremeos los valores de nuestro periodod backend 
export const DrafPeriodSchema=object({
    period_id:number(),
    name:string(),
    status:boolean(),
    date_start:string(),
    date_end:string()
})

//exportamos nuestro valores de periodos 
export const PeriodsSchema = array(PeriodSchema)
export type Period= InferOutput<typeof PeriodSchema>

//exportamos nuestros valores de question 
export const QuestionsSchema=array(QuestionSchema)
export type Question = InferOutput<typeof QuestionSchema>

//exportamos los valores de nuestro scale
export const ScalesSchema = array(ScaleSchema)
export type Scale = InferOutput<typeof ScaleSchema>

//exportamos los valores de nuestro dimension
export const DimensionsSchema = array(DimensionSchema)
export type Dimension = InferOutput<typeof DimensionSchema>

//exportamos los valores de nuestro user
export const UsersSchema = array(UserSchema)
export type User = InferOutput<typeof UserSchema>

//exportamos nuestro company
export const CompanysSchema = array(CompanySchema)
export type Company = InferOutput<typeof CompanySchema>