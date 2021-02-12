import { Controller, Req, Body, Post } from '@nestjs/common';

import { AuthRequest } from '@src/users/middlewares/auth.middleware';

import { QuesService } from './ques.service';
import { CreateQuestDto } from './dto/create-ques.dto';
import { QuesViewBlueprint } from './view/ques.view';

@Controller('ques')
export class QuesController {
  constructor(private readonly quesService: QuesService) {}

  @Post()
  async create(@Req() req: AuthRequest, @Body() bodyParams: CreateQuestDto) {
    const user = req.user;

    const quesCreateParams = { ...bodyParams, user };

    const createdQues = await this.quesService.create(quesCreateParams);

    return QuesViewBlueprint.render(createdQues);
  }
}
