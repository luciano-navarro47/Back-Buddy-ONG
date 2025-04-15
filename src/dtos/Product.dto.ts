import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { Category } from "../entities/Product";

export class CreateProductDTO {
    @IsString() name!: string;
    @IsString() @IsOptional() description?: string;
    @IsNumber({ maxDecimalPlaces: 2 }) price!: number;
    @IsInt() stock!: number;
    @IsString() image_url!: string;
    @IsEnum(Category) category!: Category;
}