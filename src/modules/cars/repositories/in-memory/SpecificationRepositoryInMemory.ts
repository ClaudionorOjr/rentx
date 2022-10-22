import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

export class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      description,
      name
    })

    this.specifications.push(specification)

    return specification
  }

  list(): Promise<Specification[]> {
    throw new Error("Method not implemented.");
  }
  
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((specification) => specification.name === name)
  }
  
  /*
   * Retorna todas especificações que tem o ids iguais aos passados como parâmetro 
   */
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) => ids.includes(specification.id))

    return allSpecifications
  }

}