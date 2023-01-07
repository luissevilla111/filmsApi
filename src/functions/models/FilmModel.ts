import * as dynamoose from "dynamoose";

import { Item } from "dynamoose/dist/Item";

class Film extends Item {
  ID: string;
  Name: string;
  Added_Time: string;
  Description: string;
  Duration_Minutes: string;
  Gender: string;
  Image_Url: string;
}

const filmSchema = new dynamoose.Schema(
  {
    ID: String,
    Name: String,
    Added_Time: String,
    Description: String,
    Duration_Minutes: String,
    Gender: String,
    Image_Url: String,
  },
  {
    timestamps: true,
  }
);

export const FilmModel = dynamoose.model<Film>("Film", filmSchema, {
  create: false,
  waitForActive: false,
});
