import { IUserLoginDTO } from "../../domain/entities/user.entity"
import { InvalidPayloadException } from '../../exceptions/invalid-payload-exception';

const REQUIRED_FIELDS = ['email', 'password'];

export const validateUserLoginPayload = (dto: IUserLoginDTO) => {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    if (!dto[REQUIRED_FIELDS[i]]?.trim()) {
      throw new InvalidPayloadException(
        `Invalid payload: field ${REQUIRED_FIELDS[i]} should be informed!`
      );
    }
  }
};