import { Model } from 'sequelize-typescript';
declare class Rol extends Model {
    rol_id: number;
    name: string;
    description: string;
}
export default Rol;
