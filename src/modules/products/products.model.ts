import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo, BelongsToMany, HasMany } from 'sequelize-typescript'
import { Category } from '../categories/categories.model'
import { Brand } from '../brands/brands.model'
import { ProductColor } from './product-colors.model'
import { ProductSize } from './product-sizes.model'

@Table({ tableName: 'products', timestamps: false })
export class Product extends Model<Product> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare id: string

  @Column({ type: DataType.STRING })
  title: string

  @Column({ type: DataType.TEXT })
  description: string

  @Column({ type: DataType.INTEGER })
  price: number

  @Column({ type: DataType.STRING })
  image_url: string

  @Column({ type: DataType.INTEGER })
  stock_quantity: number

  @Column({ type: DataType.DATE })
  created_at: Date

  @ForeignKey(() => Category)
  @Column({ type: DataType.UUID })
  category_id: string

  @ForeignKey(() => Brand)
  @Column({ type: DataType.UUID })
  brand_id: string

  @BelongsTo(() => Category)
  category: Category

  @BelongsTo(() => Brand)
  brand: Brand

  @BelongsToMany(() => require('../colors/colors.model').Color, () => ProductColor)
  colors: any[]

  @BelongsToMany(() => require('../sizes/sizes.model').Size, () => ProductSize)
  sizes: any[]

  @HasMany(() => require('../ratings/ratings.model').Rating)
  ratings: any[]
}