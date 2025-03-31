import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Department from './Department.model'

@Table({
    tableName: 'job',
    timestamps: false
})

class Job extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    job_id: number

    @Column({
        type: DataType.STRING(100),

    })
    name: string

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    description: string

    @ForeignKey(() => Department)
    @Column({
        type: DataType.INTEGER
    })
    department_id: number

    @BelongsTo(() => Department)
    department: Department
}

export default Job
