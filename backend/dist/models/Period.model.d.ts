import { Model } from 'sequelize-typescript';
import Company from './Company.model';
import Dimension from './Dimension.model';
declare class Period extends Model {
    period_id: number;
    name: string;
    status: boolean;
    date_start: string;
    date_end: string;
    company_id: number;
    company: Company;
    dimensiones: Dimension[];
}
export default Period;
