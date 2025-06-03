import { Model } from 'sequelize-typescript';
import Dimension from './Dimension.model';
import Scale from './Scale.model';
declare class Question extends Model {
    question_id: number;
    content: string;
    dimension_id: number;
    dimension: Dimension;
    escalas: Scale[];
}
export default Question;
