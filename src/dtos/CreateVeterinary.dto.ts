import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsNumberString,
} from "class-validator";

export class CreateVeterinaryDTO {
  @IsString()
  @IsNotEmpty()
  image!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  phone!: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(2)
  @IsNumber({}, { each: true })
  @IsOptional()
  location?: number[];

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;
}
