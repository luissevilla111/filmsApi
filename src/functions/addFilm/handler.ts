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
const moment = require("moment");

require("dotenv").config();

const addFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const {
      name,
      description,
      durationMinutes,
      genders,
      imageUrl,
      saga,
      stars,
    } = event.body;

    if (
      !name ||
      !description ||
      !durationMinutes ||
      !genders ||
      !imageUrl ||
      !saga ||
      !stars
    ) {
      return badRequestJSONResponse({
        message: "Algunos campos que mandaste estan vacios",
      });
    }

    const timeNow = moment.utc().format();
    const newFilm = await FilmModel.create({
      Added_Time_Utc: timeNow.toString(),
      Description: description,
      Duration_Minutes: durationMinutes.trim(),
      Genders: genders.map((gender) => gender.toUpperCase().trim()),
      Image_Url: imageUrl,
      Name: name.toUpperCase().trim(),
      Saga: saga.toUpperCase().trim(),
      Stars: stars,
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
