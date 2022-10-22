import { User } from "../entities/User";
import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>
  
  constructor(){
    this.repository = getRepository(User)
  }
  
  async create({ name, email, password, driver_license, avatar, id}: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name: name,
      email: email,
      password: password,
      driver_license: driver_license,
      avatar: avatar,
      id: id
    })
    
    await this.repository.save(user)
  }
  
  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    
    return user
  }
  
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)

    return user
  }
}