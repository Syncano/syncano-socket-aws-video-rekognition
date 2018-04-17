import { assert } from 'chai';
import { run } from '@syncano/test';
import 'dotenv/config';

import config from './utils/helpers';

describe('get-content-moderation', () => {
  it('should return content moderation analysis results of video if input parameters are valid',
    (done) => {
      const { TEST_VIDEO_JOB_ID } = process.env;
      const args = { JobId: TEST_VIDEO_JOB_ID, MaxResults: 10 };
      run('get-content-moderation', { args, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 200);
          assert.property(res.data, 'JobStatus');
          assert.property(res.data, 'ModerationLabels');
          assert.isArray(res.data.ModerationLabels);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

  it('should return "ResourceNotFoundException" if JobId not found',
    (done) => {
      const invalidArgs = { JobId: 'wrong-job-id', MaxResults: 10 };
      run('get-content-moderation', { args: invalidArgs, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'message');
          assert.propertyVal(res.data, 'message', 'Could not find JobId');
          assert.propertyVal(res.data, 'code', 'ResourceNotFoundException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
