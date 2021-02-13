import { Occupation, User } from '@prisma/client';
import { ApiModelProperty } from '@nestjs/swagger';

import { IsString, IsEmail, IsOptional, IsNumber, Min, IsEnum, IsObject } from 'class-validator';

export class CreateQuestionnaireDto {
  @IsString()
  @ApiModelProperty({ description: 'User First Name' })
  firstName: string;

  @IsEmail()
  @ApiModelProperty({ description: 'User Email' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({ type: String, description: 'User living address', required: false })
  address: string;

  @IsNumber()
  @Min(0)
  @ApiModelProperty({ type: Number, description: 'Number of children', required: false })
  children: number;

  @IsOptional()
  @IsEnum(Occupation)
  @ApiModelProperty({ type: Occupation, required: false, example: 'EMPLOYED' })
  occupation?: Occupation;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiModelProperty({ type: Number, required: false })
  userId?: number;

  @IsOptional()
  @IsObject()
  @ApiModelProperty({ type: Object, required: false })
  user?: User;
}
