import { schemaComposer as globalSchemaComposer } from 'graphql-compose';
import { JSONResolver as JSON } from 'graphql-scalars';
import algoliasearch from 'algoliasearch';

import { createSearchResolver } from './resolvers';
import { createRemoveMiddleware, createSyncMiddleware } from './middlewares';

export const composeAlgoliaIndex = (
    tc,
    { idField = '_id', indexName, fields, schemaComposer = globalSchemaComposer } = {},
) => {
    const index = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY).initIndex(indexName);

    const { name: typeName } = tc.getType();

    if (!schemaComposer.has('JSON')) {
        schemaComposer.add(JSON);
    }

    const outputType = schemaComposer.createObjectTC(`
		type ${typeName}Search {
			hits: JSON!
			nbHits: Int!
			nbPages: Int!
			page: Int!
			processingTimeMS: Int!
			hitsPerPage: Int!
			query: String!
			params: String!
		}
	`);

    // eslint-disable-next-line no-param-reassign
    tc.algoliaMiddlewares = {
        remove: createRemoveMiddleware(index),
        sync: createSyncMiddleware(index, fields, idField),
    };

    // eslint-disable-next-line no-param-reassign
    tc.algoliaResolvers = {
        search: () => createSearchResolver(index, tc, outputType),
    };

    return tc;
};
