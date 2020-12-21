export const createRemoveMiddleware = (index) => async (resolve, source, args, context, info) => {
    const data = await resolve(source, args, context, info);

    try {
        await index.deleteObject(data.record._id.toString());

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Algolia sync failed:', error.message);

        return data;
    }
};
