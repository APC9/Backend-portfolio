import { IsEmail, MinLength } from 'class-validator';

export class CreateEmailDto {

  @MinLength(4)
  name: string;
  
  @MinLength(4)
  lastName: string;

  @IsEmail()
  email:string;
  
  @MinLength(4)
  text:string;
}
