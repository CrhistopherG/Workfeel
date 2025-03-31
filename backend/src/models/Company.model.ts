import { Table, Column, Model, DataType, Default, BelongsTo, PrimaryKey, AutoIncrement, ForeignKey} from 'sequelize-typescript'

@Table({
    tableName: 'company',
    timestamps: false
})

class Company extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    company_id: number

    @Column({
        type: DataType.STRING(100),

    })
    name: string

    @Column({
        type: DataType.STRING(255),
    })
    address: string

    @Column({
        type: DataType.STRING(255),
        unique: true,
    })
    email: string

    
    @Default(0)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    credits: number
}

export default Company
