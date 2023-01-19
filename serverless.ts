import type { AWS } from "@serverless/typescript";
require("dotenv").config();

import hello from "@functions/hello";
import addFilm from "@functions/addFilm";
import getFilms from "@functions/getFilms";
import updateFilm from "@functions/updateFilm";
import deleteFilm from "@functions/deleteFilm";
import getFilm from "@functions/getFilm";
const serverlessConfiguration: AWS = {
  service: "filmsApi",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },

    region: "us-west-2",
    timeout: 30,
    profile: "luissevilla111",
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:PutItem",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:DeleteItem",
        ],
        Resource: [`${process.env.DYNAMO_RESOURCE}`],
      },
    ],
  },
  // import the function via paths
  functions: { hello, addFilm, getFilms, updateFilm, deleteFilm, getFilm },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
