import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiModelProperty({ type: String, description: 'User Email' })
  email: string;

  @ApiModelProperty({ type: String, description: 'User Password' })
  password: string;
}
