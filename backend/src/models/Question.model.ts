import { HasMany,Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo} from 'sequelize-typescript'
import Dimension from './Dimension.model'
import Scale from './Scale.model'

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
        allowNull: false
    })
    content: string

    @ForeignKey(() => Dimension)
    @Column({
        type: DataType.INTEGER
    })
    dimension_id: number

    @BelongsTo(() => Dimension)
    dimension: Dimension

    @HasMany(() => Scale)
    escalas: Scale[];
}

export default Question
