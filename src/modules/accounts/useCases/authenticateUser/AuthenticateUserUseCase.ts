import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string,
    email: string
  },
  token: string
  refresh_token: string
}

@injectable()
export class AuthenticateUserUseCase {
  private usersRepository: IUsersRepository
  private usersTokensRepository: IUsersTokensRepository
  private dateProvider: IDateProvider

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    dateProvider: IDateProvider
  ){
    this.usersRepository = usersRepository
    this.usersTokensRepository = usersTokensRepository
    this.dateProvider = dateProvider
  }

  async execute({email, password}: IRequest): Promise<IResponse> {
    //* Usuário existe
    const user = await this.usersRepository.findByEmail(email)

    const { expires_in_token, secret_refresh_token, secret_token, expires_in_refresh_token, expires_refresh_token_days } = auth

    if(!user) {
      throw new AppError("Email or password incorrect!")
    }

    //* Senha está correta
    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError("Email or password incorrect!")
    }

    //Gerar jsonwebtoken
    /*
     * 1º parâmetro: nas chaves vazias são passados os payloads, nesse caso não é necessário.
     * 2º parâmetro: palavra secreta. Nesse caso usei uma frase encriptada através MD5.
     * 3º parâmetro: objeto que recebe um 'subject' onde sempre deve-se passar o id do usuário que está gerando o token, além do 'expiresIn' informando quando vai expirar.
     */
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    })

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token
    })

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refresh_token,
      expires_date: refresh_token_expires_date
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    }

    return tokenReturn

  }

}