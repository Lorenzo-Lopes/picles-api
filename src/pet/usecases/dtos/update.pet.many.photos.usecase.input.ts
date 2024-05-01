export default class UpdatePetManyPhotosByIdUseCaseInput {
  id: string;
  photoPath: string[];
  constructor(data: Partial<UpdatePetManyPhotosByIdUseCaseInput>) {
    Object.assign(this, data);
  }
}
