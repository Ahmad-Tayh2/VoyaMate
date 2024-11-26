import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkpoint } from './checkpoint.entity';
import { CreateCheckpointDto } from './dto/create-checkpoint.dto';
import { UpdateCheckpointDto } from './dto/update-checkpoint.dto';
import { ItineraryService } from '../itinerary/itinerary.service';

@Injectable()
export class CheckpointService {
  constructor(
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
    private itineraryServise: ItineraryService,
  ) {}

  async create(dto: CreateCheckpointDto): Promise<Checkpoint> {
    try {
      const itinerary = await this.itineraryServise.findItineraryById(
        dto.itineraryId,
      );

      if (!itinerary) {
        throw new NotFoundException(`Itinerary with not found.`);
      }

      const checkpoint = this.checkpointRepository.create(dto);
      return await this.checkpointRepository.save(checkpoint);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to create checkpoint: ${error.message}`,
      );
    }
  }

  async findAll(
    itineraryId: number,
    page: number,
    limit: number,
    filters?: { checked?: boolean; plannedTime?: string },
  ): Promise<{
    data: Checkpoint[];
    metadata: {
      totalNbOfElements: number;
      totalNbOfPages: number;
      currentPageNb: number;
      nbOfElementsPerPage: number;
    };
  }> {
    try {
      if (page < 1 || limit < 1) {
        throw new BadRequestException('Page and limit must be greater than 0.');
      }

      const query = this.checkpointRepository.createQueryBuilder('checkpoint');

      query.where('checkpoint.itineraryId = :itineraryId', { itineraryId });

      if (filters?.checked !== undefined) {
        query.andWhere('checkpoint.checked = :checked', {
          checked: filters.checked,
        });
      }

      if (filters?.plannedTime) {
        query.andWhere('DATE(checkpoint.plannedTime) = :plannedTime', {
          plannedTime: filters.plannedTime,
        });
      }

      // Total elements count
      const totalNbOfElements = await query.getCount();

      // Pagination logic
      const totalNbOfPages = Math.ceil(totalNbOfElements / limit);
      const data = await query
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy('checkpoint.plannedTime', 'ASC')
        .getMany();

      return {
        data,
        metadata: {
          totalNbOfElements,
          totalNbOfPages,
          currentPageNb: page,
          nbOfElementsPerPage: limit,
        },
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch checkpoints: ${error.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Checkpoint> {
    try {
      const checkpoint = await this.checkpointRepository.findOne({
        where: { id },
      });
      if (!checkpoint) {
        throw new NotFoundException(`Checkpoint not found.`);
      }
      return checkpoint;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch checkpoint: ${error.message}`,
      );
    }
  }

  async update(id: number, dto: UpdateCheckpointDto): Promise<Checkpoint> {
    try {
      const checkpoint = await this.findOne(id);
      Object.assign(checkpoint, dto);
      return await this.checkpointRepository.save(checkpoint);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update checkpoint: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const checkpoint = await this.findOne(id);
      await this.checkpointRepository.remove(checkpoint);
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete checkpoint: ${error.message}`,
      );
    }
  }
}
