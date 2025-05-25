import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, Default, HasMany} from 'sequelize-typescript'
import Company from './Company.model'
import Dimension from './Dimension.model'

@Table({
    tableName: 'period',
    timestamps: false
})

class Period extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    period_id: number

    @Column({
        type: DataType.STRING(100),

    })
    name: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    status: boolean

    @Column({
        type: DataType.DATEONLY
    })
    date_start: string
    
    @Column({
        type: DataType.DATEONLY
    })
    date_end: string

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER
    })
    company_id: number

    @BelongsTo(() => Company)
    company: Company

     @HasMany(() => Dimension)
    dimensiones: Dimension[];
}

export default Period
