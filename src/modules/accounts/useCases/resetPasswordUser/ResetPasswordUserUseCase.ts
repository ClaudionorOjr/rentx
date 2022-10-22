import { inject, injectable } from "tsyringe"
import { hash } from "bcryptjs"

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"

import { AppError } from "@shared/errors/AppError"

interface IRequest {
  token: string
  password: string
}

@injectable()
export class ResetPasswordUserUseCase {
  private usersTokensRepository: IUsersTokensRepository
  private dateProvider: IDateProvider
  private usersRepository: IUsersRepository

  constructor(
    @inject("UsersTokensRepository")
    usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    dateProvider: IDateProvider,
    @inject("UsersRepository")
    usersRepository: IUsersRepository
  ) {
    this.usersTokensRepository = usersTokensRepository
    this.dateProvider = dateProvider
    this.usersRepository = usersRepository
  }

  async execute({token, password}: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if(!userToken) {
      throw new AppError("Token invalid!")
    }

    if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Token expired!")
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}