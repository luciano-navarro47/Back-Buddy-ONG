import { IsInt, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateOrderItemDTO {
  @IsUUID() product_id!: string;
  @IsString() name!: string;
  @IsNumber({ maxDecimalPlaces: 2 }) unit_price!: number;
  @IsInt() quantity!: number;
  @IsNumber({ maxDecimalPlaces: 2 }) @IsOptional() discount?: number;
  @IsNumber({ maxDecimalPlaces: 2 }) subtotal!: number;
  @IsUUID() order_id!: string;
}