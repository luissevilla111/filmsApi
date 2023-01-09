import {
  errorJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
//import * as dynamoose from "dynamoose";
import { FilmModel } from "@functions/models/FilmModel";
import {
  formatJSONResponse,
  /* errorJSONResponse, */
  badRequestJSONResponse,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

require("dotenv").config();

const addFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const { name, description, durationMinutes, genders, imageUrl, saga } =
      event.body;

    if (
      !name ||
      !description ||
      !durationMinutes ||
      !genders ||
      !imageUrl ||
      !saga
    ) {
      return badRequestJSONResponse({
        message: "Algunos campos que mandaste estan vacios",
      });
    }

    const newFilm = await FilmModel.create({
      Added_Time_Utc: "10-10-2010",
      Description: description,
      Duration_Minutes: durationMinutes,
      Genders: genders.map((gender) => gender.toUpperCase()),
      Image_Url: imageUrl,
      Name: name.toUpperCase(),
      Saga: saga.toUpperCase(),
    });
    //console.log(newFilm);

    return formatJSONResponse({
      film: newFilm,
    });
  } catch (err) {
    console.log(err);
    return errorJSONResponse({
      message: "Something Went Wrong",
    });
  }
};

export const main = middyfy(addFilm);
