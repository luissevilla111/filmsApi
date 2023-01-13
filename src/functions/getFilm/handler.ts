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
    const queryParams = event.queryStringParameters;

    if (!queryParams) {
      return badRequestJSONResponse({
        message: "Algunos campos que mandaste estan vacios",
      });
    }

    const saga = queryParams.Saga;
    const name = queryParams.Name;

    if (!name || !saga) {
      return badRequestJSONResponse({
        message: "Algunos campos que mandaste estan vacios",
      });
    }

    const film = await FilmModel.get({
      Saga: saga.toString().toUpperCase(),
      Name: name.toString().toUpperCase(),
    });

    if (!film) {
      return formatJSONResponse({
        film: {},
      });
    }

    return formatJSONResponse({
      film,
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      message: "Something Went Wrong",
    });
  }
};

export const main = middyfy(getFilm);
