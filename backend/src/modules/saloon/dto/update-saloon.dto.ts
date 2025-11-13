import { PartialType } from '@nestjs/mapped-types';
import { CreateSaloonDto } from './create-saloon.dto';

export class UpdateSaloonDto extends PartialType(CreateSaloonDto) {}
