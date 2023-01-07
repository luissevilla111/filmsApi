import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/api-gateway";
import * as dynamoose from "dynamoose";
import { FilmModel } from "@functions/models/FilmModel";
import {
  formatJSONResponse,
  /* errorJSONResponse, */
  badRequestJSONResponse,
} from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";

import schema from "./schema";

const addFilm: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  
  const { name, description, durationMinutes, gender, imageUrl } = event.body;

  if (!name || !description || !durationMinutes || !gender || !imageUrl) {
    return badRequestJSONResponse({
      message: "Algunos campos que mandaste estan vacios",
    });
  }

  const newFilm = await FilmModel.create({
    Description: description,
    Duration_Minutes: durationMinutes,
    Gender: gender,
    Image_Url: imageUrl,
    Name: name,
  });
  console.log(newFilm);

  return formatJSONResponse({
    test: "newFilm",
  });
};

export const main = middyfy(addFilm);
