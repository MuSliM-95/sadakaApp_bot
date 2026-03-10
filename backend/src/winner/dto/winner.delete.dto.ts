import { IsNotEmpty, IsString } from "class-validator";

export class WinnerDeleteDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}
