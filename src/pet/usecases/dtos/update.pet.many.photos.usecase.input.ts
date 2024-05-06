export default class UpdatePetManyPhotosByIdUseCaseInput {
  id: string;
  photosPath: string[];
  constructor(data: Partial<UpdatePetManyPhotosByIdUseCaseInput>) {
    Object.assign(this, data);
  }
}
