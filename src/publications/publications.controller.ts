import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { AuthGuard } from '../guards/auth.guard';


@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}
  
  @UseGuards( AuthGuard )
  @Post()
  create(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.create(createPublicationDto);
  }
  
  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.publicationsService.findOneById(id);
  }

  @Get('by-term/:term')
  findByTerm(@Param('term') term: string) {
    return this.publicationsService.findByTerm(term);
  }

  @UseGuards( AuthGuard )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @UseGuards( AuthGuard )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publicationsService.remove(id);
  }
}
