import { Category } from "../entities/Category"
import { ICategoriesRepository, ICreateCategoryDTO } from "../../../repositories/ICategoriesRepository"

import { getRepository, Repository } from "typeorm"

/**
 * Padrão Singleton
 */
export class CategoriesRepository implements ICategoriesRepository {
  // * Private pq somente o repository vai ter acesso a esse atributo
  private repository: Repository<Category>

  constructor(){
    this.repository = getRepository(Category)
  }

  // Método da classe. Tipo de retorno da função é void
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find()
    return categories
  }

  async findByName(name: string): Promise<Category> {
    // SELECT * FROM categories WHERE name = "name"
    const category = await this.repository.findOne({ name })
      
    return category
  }
}