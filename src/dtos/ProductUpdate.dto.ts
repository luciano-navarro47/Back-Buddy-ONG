import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ArrayNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";
import { Category } from "../entities/Product";

export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Type(() => Number)
  @IsOptional()
  price?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  stock?: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsEnum(Category)
  @IsOptional()
  category?: Category;
}
