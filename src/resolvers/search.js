export const createSearchResolver = (index, tc, outputType) =>
    tc.schemaComposer.createResolver({
        name: 'search',
        kind: 'query',
        description: '',
        type: outputType,
        args: {
            query: 'String!',
        },
        resolve: (resolveParams) => index.search(resolveParams.args.query, resolveParams.args.options || {}),
    });
