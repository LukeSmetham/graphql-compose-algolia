# `graphql-compose-algolia`
A plugin for [graphql-compose](https://github.com/graphql-compose/graphql-compose) that enriches your existing type composers with middlewares and resolvers to keep your data in sync with Algolia indicies.

> This library is currently WIP.
> So far I've only been using it in tandem with [graphql-compose-mongoose](https://github.com/graphql-compose/graphql-compose-mongoose) as in the examples below, so the library may be buggy, or totally broken in other environments until we can push updates.

GraphQL Compose Example:
> This example uses [graphql-compose-mongoose](https://github.com/graphql-compose/graphql-compose-mongoose) and the `withMiddlewares` functionality of `graphql-compose` resolvers. THis allows us to 

```js
import { Schema } from 'mongoose';
import { SchemaComposer } from 'graphql-compose';

/** Instantiate the schema composer */
const schemaComposer = new SchemaComposer();

/** Define the Schema and create the model for our Users in MongoDB. */
const UserSchema = new Schema({
	name: {
		type: 'String',
		required: true,
	},
	email: {
		type: 'String',
		required: true,
	},
	organization: {
		type: Schema.Types.ObjectId,
		ref: 'Organization',
		required: true,
	},
}, { collection: 'users' });

const UserModel = mongoose.model('User', UserSchema);

/** Configure composeAlgolia */
const composeAlgoliaOpts = {
	indexName: 'USERS',
	fields: ['name', 'email', 'organization'],
	schemaComposer,
};

/** Smash it all together */
const UserTC = composeAlgolia(
	composeMongoose(UserModel, { schemaComposer }),
	composeAlgoliaOpts,
);

/** Add some resolvers to your schema */
schemaComposer.addFields({
	Query: {
		userById: UserTC.mongooseResolvers.findById(),
		userSearch: UserTC.algoliaResolvers.search(),
	},
	Mutation: {
		userCreate: UserTC.mongooseResolvers.createOne().addMiddlewares([UserTC.algoliaMiddlewares.sync]),
		userUpdate: UserTC.mongooseResolvers.createOne().addMiddlewares([UserTC.algoliaMiddlewares.sync]),
		userRemove: UserTC.mongooseResolvers.createOne().addMiddlewares([UserTC.algoliaMiddlewares.remove]),
	}
});
```
