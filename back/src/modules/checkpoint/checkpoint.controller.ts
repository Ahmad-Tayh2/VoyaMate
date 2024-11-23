import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';

@Controller('checkpoints')
export class CheckpointController {
  constructor(private readonly checkpointService: CheckpointService) {}

  @Post()
  create(@Body() dto: CreateCheckpointDto) {
    return this.checkpointService.create(dto);
  }

  @Get()
  async findAll(
    @Query('itineraryId', ParseIntPipe) itineraryId: number,
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('limit', ParseIntPipe) limit: number = 10,
    @Query('checked') checked?: string,
    @Query('plannedTime') plannedTime?: string,
  ) {
    const filters = {
      checked: checked !== undefined ? checked === 'true' : undefined,
      plannedTime,
    };

    return this.checkpointService.findAll(itineraryId, page, limit, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkpointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCheckpointDto) {
    return this.checkpointService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.checkpointService.remove(+id);
  }
}
