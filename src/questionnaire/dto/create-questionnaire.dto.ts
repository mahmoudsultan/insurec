import { Occupation, User } from '@prisma/client';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateQuestionnaireDto {
  @ApiModelProperty({ description: 'User First Name' })
  firstName: string;

  @ApiModelProperty({ description: 'User Email' })
  email: string;

  @ApiModelProperty({ type: String, description: 'User living address', required: false })
  address: string;

  @ApiModelProperty({ type: Number, description: 'Number of children', required: false })
  children: number;

  @ApiModelProperty({ type: Occupation, required: false })
  occupation: Occupation;

  @ApiModelProperty({ type: Number, required: false })
  userId?: string;

  @ApiModelProperty({ type: Object, required: false })
  user?: User;
}
