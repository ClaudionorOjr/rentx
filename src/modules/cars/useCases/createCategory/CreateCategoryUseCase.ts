import { inject, injectable } from 'tsyringe'
import { AppError } from "@shared/errors/AppError"
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository
  
  constructor(
    @inject("CategoriesRepository")
    categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository
  }

  async execute({name, description}: IRequest): Promise<void> {

    const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

    if (categoryAlreadyExists) {
      // * Usado para retornar erros
      throw new AppError("Category Already Exists!")
    }
  
    await this.categoriesRepository.create({ name, description })
  }
}