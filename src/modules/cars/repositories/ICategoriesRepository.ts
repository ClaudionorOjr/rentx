import { Category } from "../infra/typeorm/entities/Category";

// * Conceito de DTO => Data Transfer Object
export interface ICreateCategoryDTO {
  name: string,
  description: string
}

export interface ICategoriesRepository {
  findByName(name: string): Promise<Category>
  list(): Promise<Category[]>
  create({ name, description }: ICreateCategoryDTO): Promise<void>
}
