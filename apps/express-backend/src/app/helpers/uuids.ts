import { uuidModel } from "../../schemas/uuid.model";

export class UUIDHelper {

    check = async (uuid: string): Promise<boolean> => {
        const exists = new uuidModel(uuid);
        await exists.save();
        console.log(exists);
        if(exists){
            return false;
        } else {
            return true;
        }
    };
}