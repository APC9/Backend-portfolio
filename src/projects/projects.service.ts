import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {


  private readonly logger = new Logger('ProjectsService');

  constructor(
    @InjectModel( Project.name )
    private projectModel: Model<Project>,
  ){}
  

  async create(createProjectDto: CreateProjectDto) {
    try {
      const project = new this.projectModel(createProjectDto);
      await project.save();
      return project; 
    } catch (error) {
      this.handleExceptionsErrors(error)
    }
  }

  async findAll() {
    const project = await this.projectModel.find();
    return project 
  }

  async findOne(id: string) {
    try {

      if( !isValidObjectId(id) ){
        throw new BadRequestException( `Project with id: ${ id } not valid`)
      } 

      const project = await this.projectModel.findById({_id: id})

      if( !project){
        throw new BadRequestException( `Project with id: ${ id } not found`)
      }
    
      return project;
    } catch (error) {
      this.handleExceptionsErrors(error)
    }
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {

    const project = await this.projectModel.findById({_id: id})

    try {

      if( !isValidObjectId(id) ){
        throw new BadRequestException( `Project with id: ${ id } not valid`)
      } 

      if( !project){
        throw new BadRequestException( `Project with id: ${ id } not found`)
      }
    
      await project.updateOne(updateProjectDto)

      //sparce las propiedades de project y las sobre escribe con updateprojectdto
      return {...project.toJSON, ...updateProjectDto };

    } catch (error) {
      this.handleExceptionsErrors(error)
    }
  }

  
  async remove(id: string ) {

    try {

      if( !isValidObjectId(id) ){
        throw new BadRequestException( `Project with id: ${ id } not valid`)
      } 

      const project = await this.projectModel.findById({_id: id})

      if( !project){
        throw new BadRequestException( `Project with id: ${ id } not found`)
      }
      
      await project.deleteOne()

      return {
        ok: true,
        msg: `${project.name} deleted successfully`
      }
    } catch (error) {
      this.handleExceptionsErrors(error)
    }

  }

  handleExceptionsErrors(error:any) {

    if( !error.message ){
      this.logger.error(error);
      throw new InternalServerErrorException('Unexpeced error, check server logs'); 
    }

    throw new BadRequestException(error.message);
  }
}
