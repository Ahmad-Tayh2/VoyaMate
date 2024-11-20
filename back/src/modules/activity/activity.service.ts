import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, QueryBuilder, Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { Checkpoint } from './entities/Checkpoints.entity';
import { FileStorageService } from 'src/helper/FileStorageservice';
import { response } from './activity.model';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { error } from 'console';
import { paginate } from 'src/helper/Paginate';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(Checkpoint)
    private readonly checkpointRepository: Repository<Checkpoint>,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
    file: { originalname: string; buffer: Buffer },
  ): Promise<response> {
    try {
      // Vérification de l'existence du checkpoint
      const checkpointId = createActivityDto.checkpointId.replace(/"/g, '').trim();
      console.log('Vérification du checkpoint avec ID:', checkpointId);

      const checkVerified = await this.checkpointRepository.findOne({
        where: { checkpointid: checkpointId },
      });

      if (!checkVerified) {
        console.log('Checkpoint non trouvé:', checkpointId);
        throw new NotFoundException(
          'Le checkpoint est absent. Veuillez vérifier vos données.',
        );
      }

      console.log('Checkpoint trouvé:', checkVerified);

      // Vérification de l'image
      if (!file) {
        console.log('Aucun fichier n\'a été fourni.');
        throw new BadRequestException('Un fichier est requis.');
      }

      console.log('Fichier reçu:', file.originalname);

      // Sauvegarde l'image
      console.log('Buffer du fichier:', file.buffer);
      const url = await this.fileStorageService.saveFile({
        originalname: file.originalname,
        buffer: file.buffer,
      });
      console.log('URL de l\'image sauvegardée:', url);

      if (!url) {
        console.log('Échec de l\'enregistrement de l\'image sur Firebase.');
        throw new InternalServerErrorException('Erreur lors de l\'enregistrement de l\'image en Firebase.');
      }

      // Création de l'activité dans la base de données
      const activity = this.activityRepository.create({
        ...createActivityDto,
        docurl: url,
        checkpoint: checkVerified,
      });

      console.log('Création de l\'activité:', activity);

      const savedActivity = await this.activityRepository.save(activity);

      if (!savedActivity) {
        console.log('Erreur lors de la sauvegarde de l\'activité dans la base de données.');
        throw new BadRequestException(
          'Erreur lors de la création de l\'activité dans la base de données.',
        );
      }

      console.log('Activité créée avec succès:', savedActivity);

      return {
        Message: 'Activité créée avec succès.',
        activity: savedActivity,
      };
    } catch (error) {
      console.error('Erreur dans la création de l\'activité:', error);
      throw new InternalServerErrorException(
        'Erreur de serveur lors de la création de l\'activité.',
      );
    }
  }

  async getactivity(id:string) :Promise<Activity[]>{
    const checkpoint = await this.checkpointRepository.findOne({
      where: { checkpointid: id },
      relations: ['activities'],  
    });
    if (!checkpoint) {
      throw new Error('Checkpoint not found');
    }
    return checkpoint.activities; 
  }
  
  async deleteActivity(id:string):Promise<DeleteResult>{
    const activite=await this.activityRepository.findOne({
      where: { id: id }});
    if(!activite) throw new NotFoundException('activite n\'existe pas');
    const result =await this.activityRepository.delete(id)
    const efface=this.fileStorageService.deleteFile(activite.docurl);
    return result; 
  }

  async updateCheckpointId(updateActivityDto: UpdateActivityDto) {
    const { id, checkpointId } = updateActivityDto;

    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['checkpoint'],
    });

    if (!activity) {
      throw new Error('Activity not found');
    }

    //  si le checkpointId est différent
    if (checkpointId && activity.checkpoint.checkpointid !== checkpointId) {

      const checkpoint = await this.checkpointRepository.findOne({
        where: { checkpointid: checkpointId },
      });

      if (!checkpoint) {
        throw new Error('Checkpoint not found');
      }
      activity.checkpoint = checkpoint;
      await this.activityRepository.save(activity);

      return activity; 
    }

    return activity; 
  }
  async getactivitypagination(page:number,limit:number):Promise<Activity[]>{
    const qb=this.activityRepository.createQueryBuilder('t')
    return paginate(qb,{page,limit})
  }

  }

