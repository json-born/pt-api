export function arrayToObject(key: string, collection: Array<any>) {
    if (!collection.length) { return {}; }
    return collection.reduce((obj, item) => {
        if (!item[key]) {
            throw new Error('Key does not exist in collection');
        }
        obj[item[key]] = item;
        return obj;
    }, {});
}
