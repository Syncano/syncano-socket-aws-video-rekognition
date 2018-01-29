import Syncano from 'syncano-server';
import callEndpoint from './utils/helpers';

export default async (ctx) => {
  const { response } = Syncano(ctx);

  try {
    const result = await callEndpoint('startContentModeration', ctx.args, ctx.config);
    const { statusCode, data } = result;
    response.json(data, statusCode);
  } catch (err) {
    const { statusCode, error } = err;
    response.json(error, statusCode);
  }
};
