import { IsArray, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateProjectDto {

  @MinLength(6)
  name: string;
  
  @IsOptional()
  img?: string;
  
  @IsUrl()
  url: string;

  @MinLength(6)
  description: string;

  @IsString()
  type: string;

  @IsArray()
  technologies: string[];

}
