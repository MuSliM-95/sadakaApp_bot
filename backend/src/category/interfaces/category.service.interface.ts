import type { Category } from "../models/category.model.js";

export interface ICategoryService {
	getCategories(): Promise<Category[]>
}