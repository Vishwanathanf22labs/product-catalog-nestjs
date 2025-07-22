import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript'

@Table({ tableName: 'product_colors', timestamps: false })
export class ProductColor extends Model<ProductColor> {
  @ForeignKey(() => require('../products/products.model').Product)
  @Column({ type: DataType.UUID })
  product_id: string

  @ForeignKey(() => require('../colors/colors.model').Color)
  @Column({ type: DataType.UUID })
  color_id: string
}