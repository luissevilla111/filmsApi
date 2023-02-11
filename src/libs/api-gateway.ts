import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema } from "json-schema-to-ts";
require("dotenv").config();

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, "body"> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;
const URL_ALLOWED = process.env.URL_ALLOWED;
export const formatJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": `*`,
      "Access-Control-Allow-Methods": `*`,
    },
    body: JSON.stringify(response),
  };
};

export const errorJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": `*`,
      "Access-Control-Allow-Methods": `*`,
    },
    body: JSON.stringify(response),
  };
};

export const badRequestJSONResponse = (response: Record<string, unknown>) => {
  return {
    statusCode: 400,
    headers: {
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Origin": `*`,
      "Access-Control-Allow-Methods": `*`,
    },
    body: JSON.stringify(response),
  };
};
