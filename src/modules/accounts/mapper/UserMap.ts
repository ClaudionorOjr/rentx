import { instanceToInstance } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  
  /*
   * Com o static não é necessário usar o "new" para instânciar um novo objeto.
   * Pode acessar o método diretamente: UserMap.toDTO()
  */
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url
    })
    return user
  }
}