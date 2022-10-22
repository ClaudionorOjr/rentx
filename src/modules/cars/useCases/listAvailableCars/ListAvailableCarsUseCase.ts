import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  category_id?: string
  brand?: string
  name?: string
}

@injectable()
export class ListAvailableCarsUseCase {
  private carsRepository: ICarsRepository

  constructor(
    @inject("CarsRepository")
    carsRepository: ICarsRepository){
    this.carsRepository = carsRepository
  }
  
  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(brand, category_id, name)

    return cars
  }
}