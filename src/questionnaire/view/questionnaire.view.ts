import { Ques, Occupation } from '@prisma/client';

import * as _ from 'lodash';
import { ApiModelProperty } from '@nestjs/swagger';

export class QuestionnaireView {
  @ApiModelProperty({ example: 1 })
  readonly id: number;

  @ApiModelProperty({ description: 'User First Name' })
  readonly firstName: string;

  @ApiModelProperty({ description: 'User Email' })
  readonly email: string;

  @ApiModelProperty({ type: String, description: 'User living address', required: false })
  readonly address?: string;

  @ApiModelProperty({ type: Number, description: 'Number of children', required: false })
  readonly children?: number;

  @ApiModelProperty({ type: Occupation, required: false })
  readonly occupation?: Occupation;

  @ApiModelProperty({ type: Number })
  readonly userId: number;
}

export class QuestionnaireViewBlueprint {
  static render(ques: Ques): QuestionnaireView;
  static render(ques: Ques[]): QuestionnaireView[];
  static render(ques: Ques | Ques[]): QuestionnaireView | QuestionnaireView[] {
    if (Array.isArray(ques)) {
      return ques.map((ques) => this.renderOne(ques)) as QuestionnaireView[];
    }

    return this.renderOne(ques) as QuestionnaireView;
  }

  private static renderOne(ques: Ques): QuestionnaireView {
    return _.pick(ques, ['id', 'firstName', 'email', 'address', 'children', 'occupation', 'userId']);
  }
}
