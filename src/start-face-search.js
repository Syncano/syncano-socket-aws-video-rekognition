import Syncano from 'syncano-server';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = Syncano(ctx);

  try {
    const { statusCode, data } = await callEndpoint('startFaceSearch', ctx.args, ctx.config);
    return response.json(data, statusCode);
  } catch ({ statusCode, error }) {
    return response.json(error, statusCode);
  }
};
