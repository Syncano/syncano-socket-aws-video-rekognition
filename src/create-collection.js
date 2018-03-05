import Syncano from 'syncano-server';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = Syncano(ctx);
  const { CollectionId } = ctx.args;

  try {
    const { statusCode, data } = await callEndpoint('createCollection', { CollectionId }, ctx.config);
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
