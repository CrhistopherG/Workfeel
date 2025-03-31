import { number, object, string, InferOutput, array, union, null_} from "valibot";


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

export const UsersSchema = array(UserSchema)

export type User = InferOutput<typeof UserSchema>