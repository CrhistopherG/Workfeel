import { HasMany,Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, Default} from 'sequelize-typescript'
import Period from './Period.model'
import Question from './Question.model';
@Table({
    tableName: 'dimension',
    timestamps: false
})

class Dimension extends Model {

    @PrimaryKey
    @AutoIncrement


    @Column({
        type: DataType.INTEGER,
        field: 'dimension_id' // <-- asegúrate de esto

    })
    dimension_id: number

    @Column({
        type: DataType.STRING(100),

    })
    name: string

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    description: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    status: boolean

    @ForeignKey(() => Period)
    @Column({
        type: DataType.INTEGER
    })
    period_id: number

    @BelongsTo(() => Period)
    period: Period

    @HasMany(() => Question)
    preguntas: Question[];
}

export default Dimension
