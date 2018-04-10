import Syncano from '@syncano/core';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = new Syncano(ctx);

  try {
    const result = await callEndpoint('startLabelDetection', ctx.args, ctx.config);
    const { statusCode, data } = result;
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
