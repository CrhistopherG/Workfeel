import { Model } from "sequelize-typescript";
import Rol from "./Rol.model";
import Company from "./Company.model";
declare class User extends Model {
    user_id: number;
    name: string;
    password: string;
    email: string;
    rol_id: number;
    rol: Rol;
    company_id: number;
    company: Company;
}
export default User;
