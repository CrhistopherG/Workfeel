import { Table, Column, Model, Validate, DataType, PrimaryKey, AutoIncrement} from 'sequelize-typescript'

@Table({
    tableName: 'scale',
    timestamps: false
})

class Scale extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    scale_id: number

    @Column({
        type: DataType.INTEGER,
        validate: {
          min: 1, // Minimum value
          max: 5, // Maximum value
          isInt: true, // Ensure it's an integer
        },
      })
    value: number

    @Column({
        type: DataType.STRING(255),
        allowNull: true
    })
    description: string
}

export default Scale
