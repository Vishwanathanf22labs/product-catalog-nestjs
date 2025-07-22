import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Brand } from './brands.model'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand) private brandModel: typeof Brand) {}

  async create(name: string) {
    try {
      return await this.brandModel.create({ name } as any)
    } catch (e) {
      throw e
    }
  }

  async findByName(name: string) {
    try {
      return await this.brandModel.findOne({ where: { name } })
    } catch (e) {
      throw e
    }
  }

  async findAll() {
    try {
      return await this.brandModel.findAll()
    } catch (e) {
      throw e
    }
  }
}