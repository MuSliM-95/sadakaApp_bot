import { IsNotEmpty, IsNumber } from "class-validator";


export class WinnerDto {
	@IsNotEmpty()
	@IsNumber()
	ticketId: number
}