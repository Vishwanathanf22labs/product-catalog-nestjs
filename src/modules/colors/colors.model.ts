import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'colors', timestamps: false })
export class Color extends Model<Color> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string

  @Column({ type: DataType.STRING, unique: true })
  name: string
}