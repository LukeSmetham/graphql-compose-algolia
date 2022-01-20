import pickBy from 'lodash.pickby';

export const createSyncManyMiddleware = (index, fields, idField) => async (resolve, source, args, context, info) => {
    const data = await resolve(source, args, context, info);
    try {
		const objects = args.filter._operators[idField].in.map((id) => ({
			...pickBy(args.record, (_, key) => fields.includes(key)),
			objectID: id.toString(), 
		}));

        await index.partialUpdateObjects(objects, {
			createIfNotExists: true,
		});

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Algolia sync many failed:', error.message);

        return data;
    }
};
