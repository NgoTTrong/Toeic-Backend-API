import { IsString } from 'class-validator';

export class LoginClerkDto {
  @IsString()
  userId: string;
}
