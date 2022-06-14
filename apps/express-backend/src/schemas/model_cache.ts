import mongoose  from "mongoose";
/**
 * Gives a cached model back if it is cached.
 * @param {any} modelName 
 * @param {any} modelSchema
 * @returns {Model} 
 */
export function cacher(modelName, modelSchema) {
    return () => {
        return mongoose.models[modelName]
            ? mongoose.model(modelName) 
            : mongoose.model(modelName, modelSchema);
    };
}