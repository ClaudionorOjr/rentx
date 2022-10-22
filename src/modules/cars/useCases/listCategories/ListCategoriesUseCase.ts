import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository

  constructor(
    @inject("CategoriesRepository")
    categoriesRepository: ICategoriesRepository){
    this.categoriesRepository = categoriesRepository
  }

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list()

    return categories
  }
}