import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { inject, injectable } from "tsyringe"

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
export class CreateRentalUseCase {
  private rentalsRepository: IRentalsRepository
  private dateProvider: IDateProvider
  private carsRepository: ICarsRepository

  constructor(
    @inject("RentalsRepository")
    rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    dateProvider: IDateProvider,
    @inject("CarsRepository")
    carsRepository: ICarsRepository

  ) {
    this.rentalsRepository = rentalsRepository
    this.dateProvider = dateProvider
    this.carsRepository= carsRepository
  }

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minimumHour = 24
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)

    if(carUnavailable) {
      throw new AppError("Car is unavailable")
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

    if(rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!")
    }
    
    const dateNow = this.dateProvider.dateNow()

    const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

    if(compare < minimumHour){
      throw new AppError("Invalid return time.")
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date
    })

    await this.carsRepository.updateAvailable(car_id, false)

    return rental
  }
}