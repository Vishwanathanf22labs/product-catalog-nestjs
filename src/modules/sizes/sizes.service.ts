import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Size } from './sizes.model'


@Injectable()
export class SizesService {
  constructor(@InjectModel(Size) private sizeModel: typeof Size) {}

  async create(value: string) {
    try {
      return await this.sizeModel.create({ value } as any)
    } catch (e) {
      throw e
    }
  }

  async findByValue(value: string) {
    try {
      return await this.sizeModel.findOne({ where: { value } })
    } catch (e) {
      throw e
    }
  }

  async findAll() {
    try {
      return await this.sizeModel.findAll()
    } catch (e) {
      throw e
    }
  }
}