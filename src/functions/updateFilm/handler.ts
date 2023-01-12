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

const updateFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const films = await FilmModel.query("Saga")
      .eq("EJEMPLO")
      .and()
      .where("Name")
      .eq("EJEMPLO PARTE 2")
      .exec();
    //console.log(FilmModel.table().hashKey);
    console.log(films);
    return formatJSONResponse({
      films,
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      message: "Something Went Wrong",
    });
  }
};

export const main = middyfy(updateFilm);
