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

const deleteFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { name, saga } = event.body;

    if (!name || !saga) {
      return badRequestJSONResponse({
        message: "Algunos campos que mandaste estan vacios",
      });
    }

    const primaryKey = {
      Saga: saga.toString(),
      Name: name.toString(),
    };
    const film = await FilmModel.get(primaryKey);

    if (!film) {
      return formatJSONResponse({
        message: "The Film was not found",
      });
    }

    await film.delete();
    console.log("was deleted");

    return formatJSONResponse({
      message: "deleted",
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      message: "Something Went Wrong",
    });
  }
};

export const main = middyfy(deleteFilm);
