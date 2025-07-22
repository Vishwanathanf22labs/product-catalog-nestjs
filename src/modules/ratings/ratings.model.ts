import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Product } from '../products/products.model'

@Table({ tableName: 'ratings', timestamps: false })
export class Rating extends Model<Rating> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  product_id: string

  @Column({ type: DataType.STRING })
  user_id: string

  @Column({ type: DataType.INTEGER })
  value: number

  @BelongsTo(() => Product)
  product: Product
} 