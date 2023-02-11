import {
  errorJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
//import * as dynamoose from "dynamoose";
import { FilmModel } from "@functions/models/FilmModel";
import { formatJSONResponse, badRequestJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

require("dotenv").config();
const SCAN_LIMIT = process.env.SCAN_LIMIT ? +process.env.SCAN_LIMIT : 10;

const optionsMethod: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    return formatJSONResponse({
      film: [],
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      film: [],
    });
  }
};

export const main = middyfy(optionsMethod);
