import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Activity } from './entities/activity.entity';
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(), //pou utiliseé le fichier dans memoire(buffer ne pas undefined)sinon on fait un fichier local et on utilise disque pour envoi vers server locale 
    }),
  )
  create(@Body() createActivityDto: CreateActivityDto,@UploadedFile() file:Express.Multer.File) {
    console.log(file)
    return this.activityService.create(createActivityDto,file);
  }

  @Get(':id')
  async getactivitiebycheckpoint(@Param() id:string):Promise<Activity[]>{
   return await  this.activityService.getactivity(id)
  }

  @Patch()
  async edit(@Body()updateActivityDto:UpdateActivityDto){
  return await this.activityService.updateCheckpointId(updateActivityDto);
  }

  @Delete(':id')
  async deleteactivity(@Param() id:string){
    return this.activityService.deleteActivity(id);
  }

  @Get()
  async findactivitypagination(
    @Query('page') page=1,
    @Query('limit') limit=1
  ):Promise<Activity[]>{
    return this.activityService.getactivitypagination(Number(page),Number(limit))
  }
}

