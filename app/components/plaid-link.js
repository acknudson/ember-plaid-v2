import PlaidLink from 'ember-plaid-v2/components/plaid-link';
import config from '../config/environment';

const plaidConfig = config['ember-plaid-v2'];

export default PlaidLink.extend({
  clientName: plaidConfig.clientName,
  env: plaidConfig.env,
  key: plaidConfig.key,
  product: plaidConfig.product,
  webhook: plaidConfig.webhook,
  token: plaidConfig.token,
  language: plaidConfig.language,
  countryCodes: plaidConfig.countryCodes,
  isWebview: plaidConfig.isWebview
});
