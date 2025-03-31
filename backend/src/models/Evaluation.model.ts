import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Company from './Company.model'
import Period from './Period.model'
import Dimension from './Dimension.model'
import Question from './Question.model'
import Scale from './Scale.model'


@Table({
    tableName: 'evaluation',
    timestamps: false
})

class Evaluation extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    evaluation_id: number
 
   // Foreign key to company
    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER
    })
    company_id: number

    @BelongsTo(() => Company)
    company: Company

    //Foreign key to period
    @ForeignKey(() => Period)
    @Column({
        type: DataType.INTEGER
    })
    period_id: number

    @BelongsTo(() => Period)
    period: Period

    //Foreign key to dimension
    @ForeignKey(() => Dimension)
    @Column({
        type: DataType.INTEGER
    })
    dimension_id: number

    @BelongsTo(() => Dimension)
    dimension: Dimension

    //Foreign key to question
    @ForeignKey(() => Question)
    @Column({
        type: DataType.INTEGER
    })
    question_id: number

    @BelongsTo(() => Question)
    question: Question

    //Foreign key to scale
    @ForeignKey(() => Scale)
    @Column({
        type: DataType.INTEGER
    })
    scale_id: number

    @BelongsTo(() => Scale)
    scale: Scale
}

export default Evaluation
