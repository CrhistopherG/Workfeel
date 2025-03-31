import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Dimension from './Dimension.model'

@Table({
    tableName: 'question',
    timestamps: false
})

class Question extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    question_id: number

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    content: string

    @ForeignKey(() => Dimension)
    @Column({
        type: DataType.INTEGER
    })
    dimension_id: number

    @BelongsTo(() => Dimension)
    dimension: Dimension
}

export default Question
