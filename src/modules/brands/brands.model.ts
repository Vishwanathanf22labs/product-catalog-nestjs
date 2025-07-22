import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'brands', timestamps: false })
export class Brand extends Model<Brand> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string

  @Column({ type: DataType.STRING, unique: true })
  name: string
}