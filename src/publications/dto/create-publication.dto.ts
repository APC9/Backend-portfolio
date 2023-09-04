import { IsString, MinLength } from 'class-validator';

export class CreatePublicationDto {

  @MinLength(6)
  name: string;
  
  @IsString()
  img?: string;

  @MinLength(6)
  content: string;
  
}
