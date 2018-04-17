import Syncano from '@syncano/core';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = new Syncano(ctx);
  const { CollectionId } = ctx.args;

  try {
    const { statusCode, data } = await callEndpoint('deleteCollection', { CollectionId }, ctx.config);
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
