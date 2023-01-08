import * as dynamoose from "dynamoose";

import { Item } from "dynamoose/dist/Item";

class Film extends Item {
  Saga: string;
  Name: string;
  Added_Time_Utc: string;
  Description: string;
  Duration_Minutes: string;
  Gender: string;
  Image_Url: string;
}

const filmSchema = new dynamoose.Schema(
  {
    Saga: String,
    Name: String,
    Added_Time_Utc: String,
    Description: String,
    Duration_Minutes: String,
    Gender: String,
    Image_Url: String,
  },
  {
    timestamps: true,
  }
);

export const FilmModel = dynamoose.model<Film>("Films", filmSchema, {
  create: false,
  waitForActive: false,
});
