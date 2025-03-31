import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement} from 'sequelize-typescript'

@Table({
    tableName: 'rol',
    timestamps: false
})

class Rol extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    rol_id: number

    @Column({
        type: DataType.STRING(100),

    })
    name: string

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    description: string

}

export default Rol
