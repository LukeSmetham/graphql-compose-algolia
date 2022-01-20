export const createRemoveMiddleware = (index, idField) => async (resolve, source, args, context, info) => {
    const data = await resolve(source, args, context, info);

    try {
        await index.deleteObject(data.record[idField].toString());

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Algolia remove failed:', error.message);

        return data;
    }
};
