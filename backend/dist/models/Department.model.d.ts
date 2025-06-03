import { Model } from 'sequelize-typescript';
import Company from './Company.model';
declare class Department extends Model {
    department_id: number;
    name: string;
    description: string;
    company_id: number;
    company: Company;
}
export default Department;
