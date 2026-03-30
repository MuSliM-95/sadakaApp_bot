
import { inject, injectable } from "inversify";
import { TYPES } from "../types.js";
import type { ICategoryService } from "./interfaces/category.service.interface.js";
import type { ICategoryRepository } from "./interfaces/category.repository.interface.js";
import type { Category } from "./models/category.model.js";

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(TYPES.GameRepository)
    private readonly categoryRepository: ICategoryRepository
  ) {}
  public async getCategories(): Promise<Category[]> {
    const category = await this.categoryRepository.findAll()

    return category;
  }
}
