import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';

import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationsService {

  private readonly logger = new Logger('ProjectsService');

  constructor(
    @InjectModel( Publication.name )
    private publicationModel: Model<Publication>,
  ){}

  async create(createPublicationDto: CreatePublicationDto) {
    const publication = new this.publicationModel( createPublicationDto );
    try {
      await publication.save();
      return publication;
    } catch (error) {
      this.handleExceptionsErrors(error);
    }
  }

  findAll() {
    const publication = this.publicationModel.find();
    return publication; 
  }

  async findOneById(id: string ) {
    let publication: Publication;

     // Buscar por MongoID
     if ( !publication && isValidObjectId( id ) ) {
      publication = await this.publicationModel.findById( id );
    }

    if(!publication) 
      throw new  NotFoundException( `publication ${id} not found` );

    return publication;
  }

  async findByTerm(term: string ) {
    let publication: Publication[];
    const regex = new RegExp(term.replace(/\s+/g, '\\s*'), 'i');

    //Buscar por termino
    publication = await this.publicationModel.find({name: regex});
  
    if( publication.length === 0 ) 
      throw new  NotFoundException( `publication ${term} not found` );

    return publication;
  }

  async update(id: string, updatePublicationDto: UpdatePublicationDto) {
    const publication = await this.publicationModel.findById({_id: id})
    try {
      if( !isValidObjectId(id)){
        throw new BadRequestException( ` id: ${id} It's not valid` );
      }

      if( !publication ){
        throw new BadRequestException( `Publication with id ${id} not found` );
      }

      await publication.updateOne( updatePublicationDto );

      // espace las propiedades de publicacion y las sobreescribe con las de updatePublication
      return { ...publication.toJSON, ...updatePublicationDto };

    } catch (error) {
        this.handleExceptionsErrors(error)
    }
  }

  async remove(id: string) {
    try {
      if( !isValidObjectId(id)){
        throw new BadRequestException( ` id: ${id} It's not valid` );
      }

      const publication = await this.publicationModel.findById({_id:id});
      
      if( !publication ){
        throw new BadRequestException( `Publication with id ${id} not found` );
      }

      await publication.deleteOne()

      return {
        ok: true,
        msg: 'Publication deleted successfully'
      }
    } catch (error) {
      this.handleExceptionsErrors( error)
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
