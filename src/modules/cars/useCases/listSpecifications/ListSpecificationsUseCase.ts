import { inject, injectable } from "tsyringe";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

@injectable()
export class ListSpecificationsUseCase {
  private specificationsRepository: ISpecificationsRepository

  constructor(
    @inject("SpecificationsRepository")
    specificationsRepository: ISpecificationsRepository) {
    this.specificationsRepository =  specificationsRepository
  }

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list()

    return specifications
  }
}