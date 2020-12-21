import pick from 'lodash.pick';
import pickBy from 'lodash.pickby';

export const createSyncMiddleware = (index, fields, idField) => async (resolve, source, args, context, info) => {
    const data = await resolve(source, args, context, info);

    try {
        await index.saveObject({
            ...pickBy(data.record, (_, key) => fields.includes(key)),
            objectID: pick(data.record, [idField])[idField],
        });

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Algolia sync failed:', error.message);

        return data;
    }
};
