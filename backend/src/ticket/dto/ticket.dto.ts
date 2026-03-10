import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class TicketDto {
	@IsNotEmpty()
	@IsString()
	id: string
}