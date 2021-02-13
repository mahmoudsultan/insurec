import { Controller, Req, Body, Post } from '@nestjs/common';

import { AuthRequest } from '@src/users/middlewares/auth.middleware';

import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireViewBlueprint } from './view/questionnaire.view';

@Controller('ques')
export class QuestionnaireController {
  constructor(private readonly quesService: QuestionnaireService) {}

  @Post()
  async create(@Req() req: AuthRequest, @Body() bodyParams: CreateQuestionnaireDto) {
    const user = req.user;

    const quesCreateParams = { ...bodyParams, user };

    const createdQues = await this.quesService.create(quesCreateParams);

    return QuestionnaireViewBlueprint.render(createdQues);
  }
}
