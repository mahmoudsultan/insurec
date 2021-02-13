import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty({ example: 'test2@test.com' })
  email: string;

  @ApiModelProperty({ example: 'string' })
  password: string;
}
