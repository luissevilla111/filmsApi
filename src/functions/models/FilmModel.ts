import * as dynamoose from "dynamoose";

import { Item } from "dynamoose/dist/Item";

export class Film extends Item {
  Saga: string;
  Name: string;
  Added_Time_Utc: string;
  Description: string;
  Duration_Minutes: string;
  Genders: string[];
  Image_Url: string;
  Stars: Number;
}

const filmSchema = new dynamoose.Schema(
  {
    Saga: { type: String, hashKey: true },
    Name: { type: String, rangeKey: true },
    Added_Time_Utc: String,
    Description: String,
    Duration_Minutes: String,
    Genders: { type: Array },
    Image_Url: String,
    Stars: Number,
  },
  {
    timestamps: true,
    saveUnknown: true,
  }
);

export const FilmModel = dynamoose.model<Film>("Films", filmSchema, {
  create: false,
  waitForActive: false,
});
