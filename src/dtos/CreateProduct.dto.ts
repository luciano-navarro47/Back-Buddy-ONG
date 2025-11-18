import {
  IsString,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  IsEnum,
  IsOptional,
  IsBoolean,
  Min,
  Length,
} from "class-validator";
import { Category } from "../entities/Product";

export class CreateProductDTO {
  @IsEnum(Category)
  category!: Category;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images!: string[];

  @IsString()
  @Length(2, 100)
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  price!: number;

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
