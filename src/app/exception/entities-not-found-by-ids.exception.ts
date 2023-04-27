import { UNABLE_TO_FIND_BY_IDS } from '../messages/constants/message.constants';

export class EntitiesNotFoundByIdsException extends Error {

    public invalidIds: number[];
    public type: string;

    constructor(invalidIds: number[], entityName: string) {
        super(UNABLE_TO_FIND_BY_IDS
          .replace('$ID', invalidIds.toString())
          .replace('$ENTITY_NAME', entityName));
        this.invalidIds = invalidIds;
    }
}
