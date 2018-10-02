/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    // These should be overwritten by the consuming app
    'ember-plaid-v2': {
      clientName: null,
      product: 'auth',
      key: 'test_key',
      env: 'sandbox'
    }
  };
};
