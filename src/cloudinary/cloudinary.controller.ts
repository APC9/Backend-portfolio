import { Controller, Post, Body, UseInterceptors, UploadedFile, BadRequestException, Get, Param, Res, UseGuards} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { AuthGuard } from '../guards/auth.guard';

@UseGuards( AuthGuard )
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


  @Get(':id')
  async getImage(@Param('id') id: string, @Res() res: Response) {
    const url = await this.cloudinaryService.getImage(id);
    res.status(200).json({
      url
    });
  }

}
