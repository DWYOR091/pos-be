import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, Not } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
  constructor(private readonly dataSource: DataSource) {}

  async validate(value: any, args: ValidationArguments) {
    const [entity, column] = args.constraints;
    const repository = this.dataSource.getRepository(entity);

    const findOptions = {
      where: {
        [column]: value,
      },
    };

    // Cek untuk mengabaikan entitas dengan ID tertentu (misalnya saat update)
    if ((args.object as any)['id']) {
      findOptions.where['id'] = Not((args.object as any)['id']);
    }

    const cek = await repository.findOne(findOptions);
    return !cek; // Jika tidak ditemukan, berarti unik.
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} dengan nilai '${args.value}' sudah digunakan.`;
  }
}

export function IsUnique(
  [entity, column]: [Function, string],
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUnique',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [entity, column],
      options: validationOptions,
      validator: UniqueValidator,
      async: true,
    });
  };
}
