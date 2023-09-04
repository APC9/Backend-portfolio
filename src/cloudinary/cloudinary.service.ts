import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary'; 
import { url } from 'inspector';
import { v4 as uuid } from 'uuid';


@Injectable()
export class CloudinaryService {
 
  constructor(
    private configService: ConfigService
  ){
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    })
  }

  async uploadImage( file: Express.Multer.File ){
    const result = await cloudinary.uploader.upload( file.path, {
      public_id: `portafolio/${uuid()}`
    })

    return result.secure_url;
  }

  async getImage(id:string){
    const url = cloudinary.url( `portafolio/${id}`)
    const existImage = await this.checkCloudinaryId(url);

    return existImage ? url: 'https://res.cloudinary.com/dybfsyxq9/image/upload/v1686847866/no-image_zio7qg.jpg';
  }

  private async checkCloudinaryId(url:string){
    try {
      const img = await fetch(url)
      
      if( img.status === 200)
        return true;

      return false; 

    } catch (error) {
      console.log(error)
    }
  }

}
