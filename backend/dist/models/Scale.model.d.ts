import { Model } from 'sequelize-typescript';
declare class Scale extends Model {
    scale_id: number;
    question_id: number;
    value: number;
    description: string;
}
export default Scale;
