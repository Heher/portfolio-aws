import type { SSTConfig } from 'sst';
import type { StackContext } from 'sst/constructs';
import { Config, RemixSite } from 'sst/constructs';
import * as cdk from 'aws-cdk-lib';
import * as cf from 'aws-cdk-lib/aws-cloudfront';

let serverCachePolicy: cdk.aws_cloudfront.CachePolicy | undefined;

function getServerCachePolicy(stack: cdk.Stack) {
  if (serverCachePolicy) {
    return serverCachePolicy;
  }

  serverCachePolicy = new cf.CachePolicy(stack, 'ServerCache', {
    queryStringBehavior: cf.CacheQueryStringBehavior.all(),
    headerBehavior: cf.CacheHeaderBehavior.none(),
    cookieBehavior: cf.CacheCookieBehavior.all(),
    defaultTtl: cdk.Duration.days(0),
    maxTtl: cdk.Duration.days(365),
    minTtl: cdk.Duration.days(0),
    enableAcceptEncodingBrotli: true,
    enableAcceptEncodingGzip: true
  });

  return serverCachePolicy;
}

function Website({ stack, app }: StackContext) {
  const stage = app.stage;

  const API_ENDPOINT = new Config.Secret(stack, 'API_ENDPOINT');

  const site = new RemixSite(stack, 'portfolio-site', {
    bind: [API_ENDPOINT],
    customDomain: {
      domainName: stage === 'prod' ? 'www.johnheher.com' : `${stage}.johnheher.com`,
      domainAlias: stage === 'prod' ? 'johnheher.com' : undefined,
      hostedZone: 'johnheher.com'
    },
    warm: 20,
    cdk: {
      serverCachePolicy: getServerCachePolicy(stack)
    }
  });

  stack.addOutputs({
    url: site.url
  });
}

export default {
  config(_input) {
    return {
      name: 'portfolio-site',
      region: 'us-east-1'
    };
  },
  stacks(app) {
    app.stack(Website);
  }
} satisfies SSTConfig;
