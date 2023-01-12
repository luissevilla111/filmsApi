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

const updateFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
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

    const film = await FilmModel.get({
      Saga: saga.toString(),
      Name: name.toString(),
    });

    if (!film) {
      return formatJSONResponse({
        film: {},
      });
    }

    //console.log(film);

    film.Description = description;
    film.Duration_Minutes = durationMinutes;
    film.Genders = genders;
    film.Image_Url = imageUrl;
    film.Stars = stars;

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
