import { DUPLICATE_ENTRY_ENTITY } from '../messages/constants/message.constants';

export class EntityDuplicateFieldException extends Error {
  constructor(entityName: string) {
      super(DUPLICATE_ENTRY_ENTITY
        .replace('$ENTITY_NAME', entityName)
      );
  }
}