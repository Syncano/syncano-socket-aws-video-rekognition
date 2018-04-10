import { assert } from 'chai';
import { run } from '@syncano/test';
import 'dotenv/config';

import config from './utils/helpers';

describe('start-person-tracking', () => {
  const { TEST_BUCKET_NAME, TEST_VIDEO } = process.env;

  it('should return valid JobId if parameters provided are valid', (done) => {
    const args = {
      Video: {
        S3Object: {
          Bucket: `${TEST_BUCKET_NAME}`,
          Name: `${TEST_VIDEO}`
        }
      }
    };
    run('start-person-tracking', { args, config })
      .then((res) => {
        process.env.TEST_VIDEO_JOB_ID = res.data.JobId;
        assert.propertyVal(res, 'code', 200);
        assert.property(res.data, 'JobId');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it('should return "ValidationException" error if Video parameter is invalid',
    (done) => {
      const invalidArgs = {
        Video: {
          S3Object: {
            Bucket: '',
            Name: `${TEST_VIDEO}`
          }
        }
      };
      run('start-person-tracking', { args: invalidArgs, config })
        .then((res) => {
          assert.propertyVal(res, 'code', 400);
          assert.property(res.data, 'message');
          assert.propertyVal(res.data, 'code', 'ValidationException');
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
});
