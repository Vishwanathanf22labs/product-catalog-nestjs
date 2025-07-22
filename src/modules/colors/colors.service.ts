import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Color } from './colors.model'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class ColorsService {
  constructor(@InjectModel(Color) private colorModel: typeof Color) {}

  async create(name: string) {
    try {
      return await this.colorModel.create({ name } as any)
    } catch (e) {
      throw e
    }
  }

  async findByName(name: string) {
    try {
      return await this.colorModel.findOne({ where: { name } })
    } catch (e) {
      throw e
    }
  }

  async findAll() {
    try {
      return await this.colorModel.findAll()
    } catch (e) {
      throw e
    }
  }
}