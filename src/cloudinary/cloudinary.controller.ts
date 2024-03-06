import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get, Param, Res, UseGuards, UploadedFiles} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';

//@UseGuards( AuthGuard ) 
@Controller('cloudinary')
export class CloudinaryController {

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors( FileInterceptor("image"))
  async uploadImage( @UploadedFile() file: Express.Multer.File): Promise<string> {

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image')
    }

    const url = await this.cloudinaryService.uploadImage(file)
    return url;
  }

  @Post('uploadImages')
  @UseInterceptors( FilesInterceptor("images"))
  async uploadImages( @UploadedFiles() files: Express.Multer.File[]) {

    if (files.length === 0) {
      throw new BadRequestException('Make sure the files are images.')
    }

    const url = await this.cloudinaryService.uploadImages(files)
    return url;

  }


  @Post('publication')
  @UseInterceptors( FileInterceptor("image"))
  async uploadImagePublication( @UploadedFile() file: Express.Multer.File): Promise<string> {

    if (!file) {
      throw new BadRequestException('Make sure that the file is an image')
    }

    const url = await this.cloudinaryService.uploadImagePublication(file)
    return url;
  }


  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const url = await this.cloudinaryService.getImage(id);
    res.status(200).json({
      url
    });
  }
  
  @Get('publication/:id')
  async getImagePublication(@Param('id') id: string, @Res() res: Response) {
    const url = await this.cloudinaryService.getImagePublication(id);
    res.status(200).json({
      url
    });
  }

}
