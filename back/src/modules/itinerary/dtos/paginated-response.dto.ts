import { IsNumber, IsObject, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ItineraryResponseDto } from './itinerary-response.dto';


class MetadataDto {

  @IsNumber()
  totalElementsNb: number;

  @IsNumber()
  totalPagesNb: number;

  @IsNumber()
  currentPageNb: number;

  @IsNumber()
  elementsPerPageNb: number;
}

export class PaginatedResponseDto {
  @IsArray()
  @ValidateNested({ each: true })  
  @Type(() => ItineraryResponseDto)  
  data: ItineraryResponseDto[];

  @IsObject()
  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;
}
