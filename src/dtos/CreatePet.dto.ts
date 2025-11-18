import {
  IsEnum,
  IsString,
  IsArray,
  ArrayMinSize,
  IsOptional,
  IsInt,
  IsUUID,
  IsNotEmpty,
  Length,
} from "class-validator";
import { Size, Specie, Age, Sex, PostType, CaseStatus } from "../entities/Pet";

export class CreatePetDTO {
  @IsOptional()
  @IsString()
  @Length(3)
  name?: string;

  @IsEnum(Size)
  size!: Size;

  @IsEnum(Specie)
  specie!: Specie;

  @IsEnum(Age)
  age!: Age;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(3, { message: "images must have at least 3 elements" })
  images!: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];

  @IsOptional()
  @IsString()
  detail?: string;

  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsOptional()
  @IsInt()
  number?: number;

  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsOptional()
  @IsEnum(Sex)
  sex?: Sex;

  @IsEnum(PostType)
  postType!: PostType;

  @IsEnum(CaseStatus)
  caseStatus!: CaseStatus;

  @IsUUID()
  userId!: string;
}
