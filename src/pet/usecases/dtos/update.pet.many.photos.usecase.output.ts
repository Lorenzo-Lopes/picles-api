import UpdatePetByIdUseCaseOutput from './update.pet.by.id.usecase.output';

export default class UpdatePetManyPhotosByIdUseCaseOutput extends UpdatePetByIdUseCaseOutput {
  constructor(data: Partial<UpdatePetManyPhotosByIdUseCaseOutput>) {
    super(data);
    Object.assign(this, data);
  }
}
