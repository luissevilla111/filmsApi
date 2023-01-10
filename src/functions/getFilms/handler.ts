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

const getFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const films = await FilmModel.scan().limit(1).exec();
    const { lastKey } = films;
    console.log(films);

    return formatJSONResponse({
      films,
      lastPage: lastKey,
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      message: "Something Went Wrong",
    });
  }
};

export const main = middyfy(getFilm);
