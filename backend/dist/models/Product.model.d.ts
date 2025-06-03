import { Model } from 'sequelize-typescript';
declare class Product extends Model {
    name: string;
    price: number;
    availability: boolean;
}
export default Product;
