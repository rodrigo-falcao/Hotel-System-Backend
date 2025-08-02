import { Injectable } from '@nestjs/common';

@Injectable()
export class RemoveHotelsService {
  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }
}
