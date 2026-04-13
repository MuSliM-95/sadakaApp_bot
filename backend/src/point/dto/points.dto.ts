import { IsNotEmpty, IsNumber } from "class-validator";

export class PintsDto {
	@IsNumber()
	@IsNotEmpty()
	score: number 
}