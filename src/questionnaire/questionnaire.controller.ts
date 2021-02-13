import { Controller, Req, Body, Post } from '@nestjs/common';

import { AuthRequest } from '@src/users/middlewares/auth.middleware';

import { QuestionnaireService } from './questionnaire.service';
import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireViewBlueprint, QuestionnaireView } from './view/questionnaire.view';
import { ApiCreatedResponse, ApiUseTags } from '@nestjs/swagger';

@Controller('questionnaire')
@ApiUseTags('Questionnaire')
export class QuestionnaireController {
  constructor(private readonly quesService: QuestionnaireService) {}

  @Post()
  @ApiCreatedResponse({ type: QuestionnaireView })
  async create(@Req() req: AuthRequest, @Body() bodyParams: CreateQuestionnaireDto): Promise<QuestionnaireView> {
    const user = req.user;

    const quesCreateParams = { ...bodyParams, user };

    const createdQues = await this.quesService.create(quesCreateParams);

    return QuestionnaireViewBlueprint.render(createdQues);
  }
}
