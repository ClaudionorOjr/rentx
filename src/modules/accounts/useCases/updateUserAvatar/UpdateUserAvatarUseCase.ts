import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string
  avatar_file: string
}

@injectable()
export class UpdateUserAvatarUseCase {
  private usersRepository: IUsersRepository
  private storageProvider: IStorageProvider

  constructor(
    @inject("UsersRepository")
    usersRepository: IUsersRepository,
    @inject("StorageProvider")
    storageProvider: IStorageProvider
  ){
    this.usersRepository = usersRepository
    this.storageProvider = storageProvider
  }

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    // Refatorar usuário com coluna avatar
    const user = await this.usersRepository.findById(user_id)

    
    if(user.avatar){
      await this.storageProvider.delete(user.avatar, "avatar")
    }

    await this.storageProvider.save(avatar_file, "avatar")
    
    user.avatar = avatar_file

    await this.usersRepository.create(user)
    
  }

}