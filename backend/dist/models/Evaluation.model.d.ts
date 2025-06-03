import { Model } from 'sequelize-typescript';
import Company from './Company.model';
import Period from './Period.model';
import Dimension from './Dimension.model';
import Question from './Question.model';
import Scale from './Scale.model';
declare class Evaluation extends Model {
    evaluation_id: number;
    company_id: number;
    company: Company;
    period_id: number;
    period: Period;
    dimension_id: number;
    dimension: Dimension;
    question_id: number;
    question: Question;
    scale_id: number;
    scale: Scale;
}
export default Evaluation;
