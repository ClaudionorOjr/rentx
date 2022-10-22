import { inject, injectable } from "tsyringe"
import { AppError } from "@shared/errors/AppError"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"

interface IRequest {
  name: string
  description: string
}

@injectable()
export class CreateSpecificationUseCase {
  private specificationsRepository: ISpecificationsRepository

  constructor(
    @inject("SpecificationsRepository")
    specificationRepository: ISpecificationsRepository){
    this.specificationsRepository = specificationRepository
  }

  async execute({name, description}: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name)

    if(specificationAlreadyExists){
      throw new AppError("Specification Already Exists!")
    }

    await this.specificationsRepository.create({name, description})
  }
}