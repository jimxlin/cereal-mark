import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  GetCommandOutput,
  PutCommand,
  PutCommandOutput,
} from "@aws-sdk/lib-dynamodb";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { TABLE_NAME, Collection } from "./types";

/************
 * DynamoDB *
 ************/

const ddbClient = new DynamoDBClient({
  region: process.env.REACT_APP_AWS_REGION,
  credentials: fromCognitoIdentityPool({
    clientConfig: { region: process.env.REACT_APP_AWS_REGION },
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID || "",
  }),
});
const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
const unmarshallOptions = {
  wrapNumbers: false,
};
const translateConfig = { marshallOptions, unmarshallOptions };
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

export const getCollection = (
  collectionId: string
): Promise<GetCommandOutput> => {
  return ddbDocClient.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: collectionId },
    })
  );
};

export const createCollection = (
  collection: Collection
): Promise<PutCommandOutput> => {
  return ddbDocClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html
      ConditionExpression: "attribute_not_exists(id)",
      Item: collection,
    })
  );
};

export const updateCollection = (
  collection: Collection
): Promise<PutCommandOutput> => {
  return ddbDocClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      // https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.OperatorsAndFunctions.html
      ConditionExpression: "attribute_exists(id)",
      Item: collection,
    })
  );
};

/****************
 * localStorage *
 ****************/

export const backupCollection = (collection: Collection): Collection | null => {
  const existingCollection = localStorage.getItem(collection.id);
  if (!existingCollection && typeof existingCollection !== "object") {
    throw new Error("Collection does not exist");
  }
  localStorage.setItem(collection.id, JSON.stringify(collection));
  return JSON.parse(localStorage.getItem(collection.id) || "null");
};
