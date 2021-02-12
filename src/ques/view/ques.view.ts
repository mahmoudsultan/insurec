import { Ques } from '@prisma/client';

import * as _ from 'lodash';

export interface QuesView {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
}

export class QuesViewBlueprint {
  static render(ques: Ques): QuesView;
  static render(ques: Ques[]): QuesView[];
  static render(ques: Ques | Ques[]): QuesView | QuesView[] {
    if (Array.isArray(ques)) {
      return ques.map((ques) => this.renderOne(ques)) as QuesView[];
    }

    return this.renderOne(ques) as QuesView;
  }

  private static renderOne(ques: Ques): QuesView {
    return _.pick(ques, ['id', 'firstName', 'email', 'address', 'children', 'occupation', 'userId']);
  }
}
