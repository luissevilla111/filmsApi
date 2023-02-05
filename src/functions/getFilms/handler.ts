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

const getFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    //console.log(SCAN_LIMIT);
    const queryParams = event.queryStringParameters;

    let StartAt: null | Object = null;
    if (queryParams) {
      const Saga = queryParams.Saga;
      const Name = queryParams.Name;
      StartAt = {
        Saga,
        Name,
      };
    }

    const films = await FilmModel.scan()
      .startAt(StartAt)
      .limit(SCAN_LIMIT)
      .exec();
    const { lastKey } = films;

    console.log(films.length);

    return formatJSONResponse({
      films,
      lastKey,
      message: "",
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      films: [],
      lastKey: {},
      message: "Something Went Wrong",
    });
  }
};

export const main = middyfy(getFilm);
