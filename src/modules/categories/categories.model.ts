import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'categories', timestamps: false })
export class Category extends Model<Category> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string

  @Column({ type: DataType.STRING, unique: true })
  name: string
}