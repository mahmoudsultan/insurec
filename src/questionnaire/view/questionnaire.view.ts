import { Ques } from '@prisma/client';

import * as _ from 'lodash';

export interface QuestionnaireView {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
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
