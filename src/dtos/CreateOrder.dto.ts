import { IsEmail, IsEnum, IsInt, IsJSON, IsNumber, IsOptional, IsString, IsUUID, ValidateNested, } from "class-validator"
import { Type } from "class-transformer";
import { Status } from "../entities/Order";
import { CreateOrderItemDTO } from "./CreateOrderItem.dto";

export class CreateOrderDTO { 
    @IsEnum(Status) status!: Status;
    @IsString() external_reference!: string;
    @IsString() @IsOptional() merchant_order_id?: string;
    @IsUUID() user_id!: string;
    @IsString() payment_id!: string;
    @IsString() buyer_name!: string;
    @IsEmail() buyer_email!: string;
    @IsNumber() total_amount!: number;
    @IsString() currency!: string;
    @IsNumber() discount_amount?: number;
    @IsString() @IsOptional() payment_method_id?: string;
    @IsInt() installments?: number;
    @IsNumber() shipping_cost?: number;
    @IsJSON() @IsString() shipping_address?: string;
    @IsJSON() @IsString() billing_address!: string;
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDTO) items!: CreateOrderItemDTO[];
}