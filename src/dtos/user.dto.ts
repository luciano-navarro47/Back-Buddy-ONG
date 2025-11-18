import {
  IsString,
  IsEmail,
  IsOptional,
  IsNumberString,
  MinLength,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  first_name!: string;

  @IsString()
  last_name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsNumberString()
  phone?: string;
}

// TO DO: add UpdateUserDTO here
