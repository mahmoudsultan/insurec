import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @ApiModelProperty({ type: String, description: 'User Email' })
  email: string;

  @IsNotEmpty()
  @ApiModelProperty({ type: String, description: 'User Password' })
  password: string;
}
