import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Category } from './categories.model'


@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(name: string) {
    try {
      return await this.categoryModel.create({ name } as any)
    } catch (e) {
      throw e
    }
  }

  async findByName(name: string) {
    try {
      return await this.categoryModel.findOne({ where: { name } })
    } catch (e) {
      throw e
    }
  }

  async findAll() {
    try {
      return await this.categoryModel.findAll()
    } catch (e) {
      throw e
    }
  }
}