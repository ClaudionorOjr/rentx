import { Request, Response } from "express";
import { container } from 'tsyringe'
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController {
  
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    await createCategoryUseCase.execute({name, description})

    // ! Mesmo que não seja enviado um json é preciso utilizar o send() para que o response seja enviado
    return response.status(201).send()
  }
}