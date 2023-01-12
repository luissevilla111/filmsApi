import {
  errorJSONResponse,
  ValidatedEventAPIGatewayProxyEvent,
} from "@libs/api-gateway";
//import * as dynamoose from "dynamoose";
import { FilmModel, Film } from "@functions/models/FilmModel";
import { formatJSONResponse, badRequestJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

require("dotenv").config();
const SCAN_LIMIT = process.env.SCAN_LIMIT ? +process.env.SCAN_LIMIT : 10;

const updateFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
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

    const film = await FilmModel.get({
      Saga: saga.toString(),
      Name: name.toString(),
    });

    //console.log(film);

    film.Description = description;
    film.Duration_Minutes = durationMinutes;
    film.Genders = genders;
    film.Image_Url = imageUrl;

    await film.save();

    //console.log(film);
    /* const key = {
      Saga: saga.toString(),
      Name: name.toString(),
    };

    const updateProperties: Partial<Film> = {
      Description: description,
      Duration_Minutes: durationMinutes,
      Genders: genders,
      Image_Url: imageUrl,
    };
    const film = await FilmModel.update(key, updateProperties); */
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

export const main = middyfy(updateFilm);
