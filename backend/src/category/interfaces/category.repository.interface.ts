import type { Category } from "../models/category.model.js";


export interface ICategoryRepository {
	findAll(): Promise<Category[]>
}