import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { Category } from '../categories/categories.model';
import { Brand } from '../brands/brands.model';
import { Color } from '../colors/colors.model';
import { Size } from '../sizes/sizes.model';
import { ProductColor } from './product-colors.model';
import { ProductSize } from './product-sizes.model';
import { Rating } from '../ratings/ratings.model';
import { Op } from 'sequelize';
import { CreateProductDto } from './dto/product.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productModel: typeof Product,
    @InjectModel(ProductColor) private productColorModel: typeof ProductColor,
    @InjectModel(ProductSize) private productSizeModel: typeof ProductSize,
    @InjectModel(Rating) private ratingModel: typeof Rating,
    @Inject(CACHE_MANAGER)
        private cacheManager: Cache
  ) {}

  async create(data: CreateProductDto) {
    try {
      const product = await this.productModel.create({
        title: data.title,
        description: data.description,
        price: data.price,
        image_url: data.image_url,
        stock_quantity: data.stock_quantity,
        category_id: data.category_id,
        brand_id: data.brand_id,
        created_at: new Date(),
      } as any);

      if (data.color_ids && data.color_ids.length > 0) {
        const colorAssociations = data.color_ids.map((colorId) => ({
          product_id: product.id,
          color_id: colorId,
        }));
        await this.productColorModel.bulkCreate(colorAssociations as any);
      }

      if (data.size_ids && data.size_ids.length > 0) {
        const sizeAssociations = data.size_ids.map((sizeId) => ({
          product_id: product.id,
          size_id: sizeId,
        }));
        await this.productSizeModel.bulkCreate(sizeAssociations as any);
      }

      if (data.ratings && data.ratings.length > 0) {
        for (const rating of data.ratings) {
          await this.ratingModel.create({
            product_id: product.id,
            user_id: rating.user_id,
            value: rating.value,
          } as any);
        }
      }

      return product;
    } catch (err) {
      console.error('Product creation error:', err);
      throw err;
    }
  }

  async findAll(query: any) {
    const cacheKey = `products:${JSON.stringify(query)}`
            const cached = await this.cacheManager.get<Product[]>(cacheKey)
            if(cached){
                return{success: true, products: cached}
            }
    const {
      category,
      brand,
      color,
      size,
      minPrice,
      maxPrice,
      minRating,
      sortBy = 'created_at',
      order = 'desc',
      page = 1,
      limit = 10,
    } = query;
    const where: any = {};
    const include: any = [];

    if (category) {
      include.push({
        association: 'category',
        where: { name: category },
        required: true,
      });
    } else {
      include.push({ association: 'category' });
    }

    if (brand) {
      include.push({
        association: 'brand',
        where: { name: brand },
        required: true,
      });
    } else {
      include.push({ association: 'brand' });
    }

    if (color) {
      include.push({
        association: 'colors',
        where: { name: color },
        through: { attributes: [] },
        required: true,
      });
    } else {
      include.push({ association: 'colors', through: { attributes: [] } });
    }

    if (size) {
      include.push({
        association: 'sizes',
        where: { value: size },
        through: { attributes: [] },
        required: true,
      });
    } else {
      include.push({ association: 'sizes', through: { attributes: [] } });
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) {
        where.price[Op.gte] = parseInt(minPrice);
      }
      if (maxPrice) {
        where.price[Op.lte] = parseInt(maxPrice);
      }
    }

    const offset = (+page - 1) * limit;

    const products = await this.productModel.findAll({
      where: where,
      include: include,
      offset: +offset,
      limit: +limit,
      order: [[sortBy, order]],
    });

    let result = products;

    if (minRating) {
      const filtered: Product[] = [];
      for (const i of products) {
        const ratings = i.ratings || [];
        const avg =
          ratings.reduce((sum, r) => sum + r.value, 0) / (ratings.length || 1);
        if (avg >= parseFloat(minRating)) {
          filtered.push(i);
        }
      }
      result = filtered;
    }
await this.cacheManager.set(cacheKey, result, 300)
    return { success: true, products: result };
  }

  async findOne(id: string) {
    return await this.productModel.findByPk(id, {
      include: [
        { model: Category },
        { model: Brand },
        { model: Color, through: { attributes: [] } },
        { model: Size, through: { attributes: [] } },
        { model: Rating, attributes: ['value'] },
      ],
    });
  }
}
