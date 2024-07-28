import { Stack, StackProps } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AddRoutesOptions } from 'aws-cdk-lib/aws-apigatewayv2';
import { config } from 'dotenv';

config({
  path: '../.env'
});

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const environment = {
      DB_USER: process.env.DB_USER!,
      DB_PASS: process.env.DB_PASS!,
      DB_HOST: process.env.DB_HOST!,
      DB_PORT: process.env.DB_PORT!,
      DB_NAME: process.env.DB_NAME!,
    };

    console.log(environment)

    const nestLambda = new lambda.Function(this, 'NestCartLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'bundle.handler',
      code: lambda.Code.fromAsset('../dist'),
      timeout: cdk.Duration.seconds(15),
      environment: environment,
    });

    const api = new apigateway.LambdaRestApi(this, 'NestCartApi', {
      handler: nestLambda,
      proxy: true,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });
  }
}
