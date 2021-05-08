/* global Plaid:false */
// Sets Plaid as a global read-only variable for eslint

import Component from '@ember/component';
import layout from '../templates/components/plaid-link';

const OPTIONS = ['clientName', 'env', 'key', 'product', 'webhook', 'token', 'language', 'countryCodes'];
const DEFAULT_LABEL = 'Link Bank Account'; // Displayed on button if no block is passed to component

export default Component.extend({
  layout,
  tagName: 'button',
  label: DEFAULT_LABEL,

  // Link action Parameters to pass into component via view
  onSuccess() {},
  onOpen() {},
  onLoad() {},
  onExit() {},
  onError() {},
  onEvent() {},

  // Optional Link Parameter for user ex: { legalName: 'John Appleseed', emailAddress: 'jappleseed@yourapp.com' }
  user: null,

  // Link Parameters to pass into component via config file
  // Complete documentation: https://plaid.com/docs/api/#parameter-reference
  clientName: null,
  env: null,
  key: null,
  product: null,
  webhook: null,
  token: null,
  language: null,
  countryCodes: null,
  isWebview: null,
  receivedRedirectUri: null,

  // Private
  _link: null,

  init() {
    let scope = this;
    scope._super(...arguments);
    const options = Object.assign(scope.getProperties(OPTIONS), {
      onLoad: scope._onLoad.bind(scope),
      onSuccess: scope._onSuccess.bind(scope),
      onExit: scope._onExit.bind(scope),
      onEvent: scope._onEvent.bind(scope),
      user: scope.user,
      isWebview: scope.isWebview,
      receivedRedirectUri: scope.receivedRedirectUri
    });
    return new Ember.RSVP.Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
      script.onload = resolve;
      script.onerror = reject;
      document.getElementsByTagName('head')[0].appendChild(script);
    }).then(() => {
      scope._link = window.Plaid.create(options);
      if (window.plaid_link_handlers) {
        window.plaid_link_handlers.push(scope._link);
      } else {
        window.plaid_link_handlers = [scope._link];
      }
    }).catch(() => {
      scope.get('_onError').bind(scope)();
    });
  },

  click() {
    this.send('clicked');
    this._link.open();
  },

  _onError() {
    this.send('errored');
  },

  _onLoad() {
    this.send('loaded');
  },

  _onExit: function(error, metadata) {
    this.send('exited', error, metadata);
  },

  _onSuccess: function(token, metadata) {
    this.send('succeeded', token, metadata);
  },

  _onEvent: function(eventName, metadata) {
    this.send('event', eventName, metadata);
  },

  actions: {
    // Send closure actions passed into component

    clicked() {
      this.get('onOpen')();
    },

    loaded() {
      this.get('onLoad')();
    },

    exited(error, metadata) {
      this.get('onExit')(error, metadata);
    },

    errored() {
      this.get('onError')();
    },

    succeeded(token, metadata) {
      this.get('onSuccess')(token, metadata);
    },

    event(eventName, metadata) {
      this.get('onEvent')(eventName, metadata);
    }
  }
});
