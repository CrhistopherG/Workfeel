import { Model } from 'sequelize-typescript';
import Period from './Period.model';
import Question from './Question.model';
declare class Dimension extends Model {
    dimension_id: number;
    name: string;
    description: string;
    status: boolean;
    period_id: number;
    period: Period;
    preguntas: Question[];
}
export default Dimension;
