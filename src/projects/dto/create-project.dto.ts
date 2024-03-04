import { IsArray, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { TypeProyect } from './typeProject.enum';

export class CreateProjectDto {

  @MinLength(6)
  name: string;
  
  @IsOptional()
  img?: string[];
  
  @IsUrl()
  url: string;

  @MinLength(6)
  description: string;

  @IsString()
  type: TypeProyect;

  @IsArray()
  technologies: string[];

}
