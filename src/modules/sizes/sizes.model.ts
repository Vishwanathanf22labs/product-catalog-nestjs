import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript'

@Table({ tableName: 'sizes', timestamps: false })
export class Size extends Model<Size> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID })
  declare id: string; 

  @Column({ type: DataType.STRING })
  declare value: string; 
}
