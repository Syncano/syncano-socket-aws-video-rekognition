import Syncano from 'syncano-server';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = Syncano(ctx);
  const { CollectionId } = ctx.args;

  try {
    const result = await callEndpoint('createCollection', { CollectionId }, ctx.config);
    const { statusCode, data } = result;
    response.json(data, statusCode);
  } catch (err) {
    const { statusCode, error } = err;
    response.json(error, statusCode);
  }
};
