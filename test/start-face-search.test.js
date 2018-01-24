import { assert } from 'chai';
import { run } from 'syncano-test';
import 'dotenv/config';

import config from './utils/helpers';

describe('start-face-search', () => {
  const { TEST_BUCKET_NAME, TEST_VIDEO, SEARCH_COLLECTION } = process.env;

  it('should return valid JobId if parameters provided is valid', (done) => {
    const args = {
      CollectionId: SEARCH_COLLECTION,
      FaceMatchThreshold: 60,
      Video: {
        S3Object: {
          Bucket: `${TEST_BUCKET_NAME}`,
          Name: `${TEST_VIDEO}`
        }
      }
    };
    run('start-face-search', { args, config })
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

  it('should return "ValidationException" error if CollectionId is not sent as parameter',
    (done) => {
      const invalidArgs = {
        Video: {
          S3Object: {
            Bucket: `${TEST_BUCKET_NAME}`,
            Name: `${TEST_VIDEO}`
          }
        }
      };
      run('start-face-search', { args: invalidArgs, config })
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
