import Syncano from '@syncano/core';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = new Syncano(ctx);

  try {
    const { statusCode, data } = await callEndpoint('getCelebrityRecognition', ctx.args, ctx.config);
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
