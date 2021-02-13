import { Occupation, User } from '@prisma/client';

export interface CreateQuestionnaireDto {
  firstName: string;
  email: string;
  address: string;
  children: number;
  occupation: Occupation;
  userId?: string;
  user?: User;
}
