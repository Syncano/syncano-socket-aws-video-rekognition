# aws-video-rekognition

[![CircleCI](https://circleci.com/gh/Syncano/syncano-socket-aws-video-rekognition.svg?style=svg)](https://circleci.com/gh/Syncano/syncano-socket-aws-video-rekognition)

`version:` **0.0.1**

Amazon Rekognition video actions integration

To install, run:

```
syncano-cli add aws-video-rekognition
```

## Config

| Name | Required | Description | Info
| ---- | -------- | ----------- | ----
| AWS_REGION | true | AWS region | Check link below for aws comprehend available regions (https://docs.aws.amazon.com/comprehend/latest/dg/guidelines-and-limits.html) 
| AWS_SECRET_ACCESS_KEY | true | AWS secret access key | Visit link to know more about managing keys (http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html). 
| AWS_ACCESS_KEY_ID | true | AWS access key id | Visit link to know more about managing keys (http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html). 

## Endpoints

### create-collection

Creates collection in an AWS Region

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| CollectionId | string | ID for the collection that you are creating | Syncano



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "CollectionArn": "aws:rekognition:us-west-2:11111111111:collection/mycollection",
  "FaceModelVersion": "2.0",
  "StatusCode": 200
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ResourceAlreadyExistsException",
  "message":"A collection with the specified ID already exists."
}
```

### delete-collection

Deletes the specified collection

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| CollectionId | string | ID of the collection to delete | Syncano



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "StatusCode": 200
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "AccessDeniedException",
  "message":"You are not authorized to perform the action"
}
```

### list-collections

Returns list of collection IDs in your account

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| MaxResults | number | Maximum number of collection IDs to return. (Optional) | 5
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "CollectionIds": [ "string" ],
  "FaceModelVersions": [ "string" ],
  "NextToken": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ResourceNotFoundException",
  "message":"The collection id: nonExistingName does not exist"
}
```

### start-label-detection

Starts asynchronous detection of labels in a stored video

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| Video | object | The video in which you want to detect labels. The video must be stored in an Amazon S3 bucket | {   "S3Object": {     "Bucket": "string",     "Name": "string",     "Version": "string"   } } 
| JobTag | string | Unique identifier you specify to identify the job in the completion status. (Optional) | my-job1
| MinConfidence | number | Minimum confidence that Rekognition Video must have in order to return a detected label, default is 50 (Optional) | 30
| ClientRequestToken | string | Idempotent token used to identify the start request. (Optional) | 
| NotificationChannel | object | Amazon SNS topic ARN you want Rekognition to publish the completion status of the label detection operation to (Optional) | {   "RoleArn": "string",   "SNSTopicArn": "string" } 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobId": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "retryable": false
}
```

### get-label-detection

Gets the label detection results of a Rekognition Video analysis

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| JobId | string | Job identifier for the label detection operation for which you want results returned | my-job12234678
| SortBy | string | Sort to use for elements in the Labels array. Sort by NAME or TIMESTAMP (Optional) | NAME
| MaxResults | number | Maximum number of collection IDs to return. (Optional) | 5
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobStatus": "string",
  "Labels": [],
  "NextToken": "string",
  "StatusMessage": "string",
  "VideoMetadata": {
    "Codec": "string",
    "DurationMillis": number,
    "Format": "string",
    "FrameHeight": number,
    "FrameRate": number,
    "FrameWidth": number
  }
}
```

##### Failed `400`

```
{
  "message": "Could not find JobId",
  "code": "ResourceNotFoundException",
  "statusCode": 400,
}
```

### start-celebrity-recognition

Starts asynchronous recognition of celebrities in a stored video

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| Video | object | The video in which you want to recognize celebrities. The video must be stored in an Amazon S3 bucket | {   "S3Object": {     "Bucket": "string",     "Name": "string",     "Version": "string"   } } 
| JobTag | string | Unique identifier you specify to identify the job in the completion status. (Optional) | my-job1
| ClientRequestToken | string | Idempotent token used to identify the start request. (Optional) | 
| NotificationChannel | object | Amazon SNS topic ARN you want Rekognition to publish the completion status of the celebrity recognition analysis to (Optional) | {   "RoleArn": "string",   "SNSTopicArn": "string" } 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobId": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "retryable": false
}
```

### get-celebrity-recognition

Gets the celebrity recognition results for a Rekognition Video analysis

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| JobId | string | Job identifier for the required celebrity recognition analysis | my-job12234678
| SortBy | string | Sort to use for celebrities returned in Celebrities field. Sort by ID or TIMESTAMP (Optional) | TIMESTAMP
| MaxResults | number | Maximum number of celebrities you want Rekognition Video to return in the response. (Optional) | 5
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobStatus": "string",
  "Celebrities": [],
  "NextToken": "string",
  "StatusMessage": "string",
  "VideoMetadata": {
    "Codec": "string",
    "DurationMillis": number,
    "Format": "string",
    "FrameHeight": number,
    "FrameRate": number,
    "FrameWidth": number
  }
}
```

##### Failed `400`

```
{
  "message": "Could not find JobId",
  "code": "ResourceNotFoundException",
  "statusCode": 400,
}
```

### start-content-moderation

Starts asynchronous detection of explicit or suggestive adult content in a stored video

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| Video | object | The video in which you want to moderate content. The video must be stored in an Amazon S3 bucket | {   "S3Object": {     "Bucket": "string",     "Name": "string",     "Version": "string"   } } 
| JobTag | string | Unique identifier you specify to identify the job in the completion status. (Optional) | my-job1
| ClientRequestToken | string | Idempotent token used to identify the start request. (Optional) | 
| MinConfidence | number | Minimum confidence that Rekognition Video must have in order to return a moderated content label. (Optional) | 30
| NotificationChannel | object | Amazon SNS topic ARN you want Rekognition to publish the completion status of the content moderation analysis to (Optional) | {   "RoleArn": "string",   "SNSTopicArn": "string" } 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobId": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "retryable": false
}
```

### get-content-moderation

Gets the content moderation analysis results for a Rekognition Video analysis

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| JobId | string | The identifier for the content moderation job | my-job12234678
| SortBy | string | Sort to use for elements in the ModerationLabelDetections array. Sort by NAME or TIMESTAMP (Optional) | TIMESTAMP
| MaxResults | number | Maximum number of content moderation labels to return. (Optional) | 5
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobStatus": "string",
  "ModerationLabels": [],
  "NextToken": "string",
  "StatusMessage": "string",
  "VideoMetadata": {
    "Codec": "string",
    "DurationMillis": number,
    "Format": "string",
    "FrameHeight": number,
    "FrameRate": number,
    "FrameWidth": number
  }
}
```

##### Failed `400`

```
{
  "message": "Could not find JobId",
  "code": "ResourceNotFoundException",
  "statusCode": 400,
}
```

### start-face-detection

Starts asynchronous detection of faces in a stored video

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| Video | object | The video in which you want to detect faces. The video must be stored in an Amazon S3 bucket | {   "S3Object": {     "Bucket": "string",     "Name": "string",     "Version": "string"   } } 
| JobTag | string | Unique identifier you specify to identify the job in the completion status. (Optional) | my-job1
| FaceAttributes | string | The face attributes you want returned. Valid values are DEFAULT or ALL (Optional) | ALL
| ClientRequestToken | string | Idempotent token used to identify the start request. (Optional) | 
| NotificationChannel | object | Amazon SNS topic ARN you want Rekognition to publish the completion status of the face detection operation to (Optional) | {   "RoleArn": "string",   "SNSTopicArn": "string" } 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobId": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "retryable": false
}
```

### get-face-detection

Gets the face detection results for a Rekognition Video analysis

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| JobId | string | Unique identifier for the face detection job | my-job12234678
| MaxResults | number | Maximum number of detected faces to return. (Optional) | 5
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobStatus": "string",
  "Faces": [],
  "NextToken": "string",
  "StatusMessage": "string",
  "VideoMetadata": {
    "Codec": "string",
    "DurationMillis": number,
    "Format": "string",
    "FrameHeight": number,
    "FrameRate": number,
    "FrameWidth": number
  }
}
```

##### Failed `400`

```
{
  "message": "Could not find JobId",
  "code": "ResourceNotFoundException",
  "statusCode": 400,
}
```

### start-person-tracking

Starts the asynchronous tracking of persons in a stored video

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| Video | object | The video in which you want to detect people. The video must be stored in an Amazon S3 bucket | {   "S3Object": {     "Bucket": "string",     "Name": "string",     "Version": "string"   } } 
| JobTag | string | Unique identifier you specify to identify the job in the completion status. (Optional) | my-job1
| ClientRequestToken | string | Idempotent token used to identify the start request. (Optional) | 
| NotificationChannel | object | Amazon SNS topic ARN you want Rekognition to publish the completion status of the people detection operation to (Optional) | {   "RoleArn": "string",   "SNSTopicArn": "string" } 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobId": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "retryable": false
}
```

### get-person-tracking

Gets the person tracking results for a Rekognition Video analysis

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| JobId | string | The identifier for a job that tracks persons in a video | my-job12234678
| SortBy | string | Sort to use for elements in the Persons array. Sort by INDEX or TIMESTAMP (Optional) | TIMESTAMP
| MaxResults | number | Maximum number of tracked persons to return. (Optional) | 5
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobStatus": "string",
  "Persons": [],
  "NextToken": "string",
  "StatusMessage": "string",
  "VideoMetadata": {
    "Codec": "string",
    "DurationMillis": number,
    "Format": "string",
    "FrameHeight": number,
    "FrameRate": number,
    "FrameWidth": number
  }
}
```

##### Failed `400`

```
{
  "message": "Could not find JobId",
  "code": "ResourceNotFoundException",
  "statusCode": 400,
}
```

### start-face-search

Starts the asynchronous search for faces in a collection that match the faces of persons detected in a stored video

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| CollectionId | string | ID of the collection that contains the faces you want to search for | Syncano
| Video | object | The video you want to search. The video must be stored in an Amazon S3 bucket | {   "S3Object": {     "Bucket": "string",     "Name": "string",     "Version": "string"   } } 
| JobTag | string | Unique identifier you specify to identify the job in the completion status. (Optional) | my-job1
| FaceMatchThreshold | number | The minimum confidence in the person match to return (Optional) | 70
| ClientRequestToken | string | Idempotent token used to identify the start request. (Optional) | 
| NotificationChannel | object | Amazon SNS topic ARN you want Rekognition to publish the completion status of the search (Optional) | {   "RoleArn": "string",   "SNSTopicArn": "string" } 



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobId": "string"
}
```

##### Failed `400`

```
{
  "statusCode": 400,
  "code": "ValidationException",
  "retryable": false
}
```

### get-face-search

Gets the face search results for Rekognition Video face search

#### Parameters

| name | type | description | example
| ---- | ---- | ----------- | -------
| JobId | string | The job identifer for the search request. | my-job12234678
| SortBy | string | Sort to use for grouping faces in the response. Sort by INDEX or TIMESTAMP (Optional) | TIMESTAMP
| MaxResults | number | Maximum number of search results you want Rekognition Video to return in the response. (Optional) | 20
| NextToken | string | Pagination token from the previous response. (Optional) | token



#### Response

mimetype: `application/json`

##### Success `200`

```
{
  "JobStatus": "string",
  "Persons": [],
  "NextToken": "string",
  "StatusMessage": "string",
  "VideoMetadata": {
    "Codec": "string",
    "DurationMillis": number,
    "Format": "string",
    "FrameHeight": number,
    "FrameRate": number,
    "FrameWidth": number
  }
}
```

##### Failed `400`

```
{
  "message": "Could not find JobId",
  "code": "ResourceNotFoundException",
  "statusCode": 400,
}
```
