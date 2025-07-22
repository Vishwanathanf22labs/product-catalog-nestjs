import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'

@Table({ tableName: 'product_sizes', timestamps: false })
export class ProductSize extends Model<ProductSize> {
  @ForeignKey(() => require('../products/products.model').Product)
  @Column({ type: DataType.UUID })
  product_id: string

  @ForeignKey(() => require('../sizes/sizes.model').Size)
  @Column({ type: DataType.UUID })
  size_id: string
}