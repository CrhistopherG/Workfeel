import { number, object, string, InferOutput, array, union, null_, boolean, date} from "valibot";


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

//exportamos los valores de nuestro company 
export const DraftCompanySchema=object({
    name: string(),
    address: string(),
    email: string(),
    credits: number()
})

export const CompanySchema=object({
    company_id: number(),
    name: string(),
    address: string(),
    email: string(),
    credits: number(),
})

export const PeriodSchema=object({
    period_id: number(),
    name: string(),
    status: boolean(),
    date_start: date(),
    date_end: date(),
    company_id: number()
})


export const UsersSchema = array(UserSchema)

export type User = InferOutput<typeof UserSchema>
export type Period = InferOutput<typeof PeriodSchema>

//exportamos nuestro company
export const CompanysSchema = array(CompanySchema)
export type Company = InferOutput<typeof CompanySchema>