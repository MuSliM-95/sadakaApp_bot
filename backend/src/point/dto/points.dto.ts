import {
	IsArray,
	IsInt,
	IsNotEmpty,
	IsString,
	ValidateNested,
  } from "class-validator";
  import { Type } from "class-transformer";
  
  class PositionDto {
	@IsInt()
	r: number;
  
	@IsInt()
	c: number;
  }
  
  class MoveDto {
	@IsNotEmpty()
	@IsString()
	shapeId: string;
  
	@ValidateNested()
	@Type(() => PositionDto)
	position: PositionDto;
  }
  
  export class GameFinishDto {
	@IsNotEmpty()
	@IsString()
	sessionId: string;
  
	@IsInt()
	clientScore: number;
  
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => MoveDto)
	moves: MoveDto[];
  }