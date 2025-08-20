import {
    ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { Type } from "class-transformer";
import { Category } from "../entities/Product";
export class CreateProductDTO {
  @IsString() name!: string;
  @IsString() @IsOptional() description?: string;
  @IsNumber({ maxDecimalPlaces: 2 }) @Type(() => Number) price!: number;
  @IsInt() @Type(() => Number) stock!: number;
  @IsArray() @ArrayNotEmpty() @IsString({ each: true }) images!: string[];
  @IsEnum(Category) category!: Category;
}
