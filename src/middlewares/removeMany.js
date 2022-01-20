export const createRemoveManyMiddleware = (index, idField) => async (resolve, source, args, context, info) => {
    const data = await resolve(source, args, context, info);

    try {
        await index.deleteObjects(data.args.filter._operators[idField].in.map((id) => id.toString()));

        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Algolia remove many failed:', error.message);

        return data;
    }
};
