import { Model } from 'sequelize-typescript';
declare class Company extends Model {
    company_id: number;
    name: string;
    address: string;
    email: string;
    credits: number;
}
export default Company;
