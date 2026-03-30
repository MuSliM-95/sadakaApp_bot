import { ContainerModule, type ContainerModuleLoadOptions } from "inversify";
import { Category } from "./models/category.model.js";
import { TYPES } from "../types.js";
import { GameCategory } from "./models/game.category.js";
import { CategoryController } from "./category.controller.js";
import type { ICategoryController } from "./interfaces/category.controller.interface.js";
import { CategoryService } from "./category.service.js";
import type { ICategoryService } from "./interfaces/category.service.interface.js";
import type { ICategoryRepository } from "./interfaces/category.repository.interface.js";
import { CategoryRepository } from "./category.repository.js";


export const categoryBindings = new ContainerModule((options: ContainerModuleLoadOptions) => {
	options.bind<typeof Category>(TYPES.Models).toConstantValue(Category)
	options.bind<typeof GameCategory>(TYPES.Models).toConstantValue(GameCategory)
	options.bind<ICategoryController>(TYPES.CategoryController).to(CategoryController)
	options.bind<ICategoryService>(TYPES.CategoryService).to(CategoryService)
	options.bind<ICategoryRepository>(TYPES.CategoryRepository).to(CategoryRepository)
})