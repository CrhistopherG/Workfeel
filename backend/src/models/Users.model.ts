import {
    Table,
    Column,
    Model,
    DataType,
    Default,
    BelongsTo,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
  } from "sequelize-typescript";
  import Rol from "./Rol.model";
  import Company from "./Company.model";
  
  @Table({ tableName: "users", timestamps: false })
class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  user_id: number;

  @Column(DataType.STRING(100))
  name: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(255), unique: true })
  email: string;

  @ForeignKey(() => Rol)
  @Default(2)
  @Column(DataType.INTEGER)
  rol_id: number;

  @BelongsTo(() => Rol)
  rol: Rol;

  @ForeignKey(() => Company)
  @Column(DataType.INTEGER)
  company_id: number;

  @BelongsTo(() => Company)
  company: Company;
}

  
  export default User;
  
