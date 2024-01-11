import type { SSTConfig } from 'sst';
import type { StackContext } from 'sst/constructs';
import { Config, RemixSite } from 'sst/constructs';

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
    warm: 20
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
