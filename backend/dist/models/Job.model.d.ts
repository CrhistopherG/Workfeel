import { Model } from 'sequelize-typescript';
import Department from './Department.model';
declare class Job extends Model {
    job_id: number;
    name: string;
    description: string;
    department_id: number;
    department: Department;
}
export default Job;
