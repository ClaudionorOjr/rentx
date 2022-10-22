import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
export class CreateUserUseCase {
  private usersRepository: IUsersRepository

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password, driver_license}: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if(userAlreadyExists) {
      throw new AppError("User already exists!")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      name: name,
      email: email,
      password: passwordHash,
      driver_license: driver_license
    })
  }
}