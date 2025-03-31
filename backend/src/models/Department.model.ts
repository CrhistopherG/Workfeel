import { Table, Column, Model, DataType, HasMany, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Company from './Company.model'

@Table({
    tableName: 'department',
    timestamps: false
})

class Department extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    department_id: number

    @Column({
        type: DataType.STRING(100),

    })
    name: string

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    description: string

    
    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER
    })
    company_id: number

    @BelongsTo(() => Company)
    company: Company

}

export default Department
