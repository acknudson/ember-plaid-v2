import Component from '@ember/component';
import layout from '../templates/components/plaid-link';
import { inject as service } from '@ember/service';

const OPTIONS = ['clientName', 'env', 'key', 'product', 'webhook', 'token', 'apiVersion'];
const DEFAULT_LABEL = 'Link Bank Account'; // Displayed on button if no block is passed to component

export default Component.extend({
  layout,
  tagName: 'button',
  plaid: service(),
  label: DEFAULT_LABEL,

  // Link action Parameters to pass into component via view
  onSuccess() {},
  onOpen() {},
  onLoad() {},
  onExit() {},
  onError() {},
  onEvent() {},

  // Link Parameters to pass into component via config file
  // Complete documentation: https://plaid.com/docs/api/#parameter-reference
  clientName: null,
  env: null,
  key: null,
  product: null,
  webhook: null,
  token: null,
  apiVersion: 'v2',

  // Private
  _link: null,
  _options: null,

  init() {
    this._super(...arguments);
    this._options = Object.assign(this.getProperties(OPTIONS), {
      onLoad: this._onLoad.bind(this),
      onSuccess: this._onSuccess.bind(this),
      onExit: this._onExit.bind(this),
      onEvent: this._onEvent.bind(this),
    });
    this.get('plaid').injectScript().catch(this._onError.bind(this));
  },

  click() {
    this.send('clicked');
    this.get('plaid').open(this._options).catch(this._onError.bind(this));
  },

  _onError(err) {
    this.send('errored', err);
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
    this.send('eventEmitted', eventName, metadata);
  },

  actions: { // Send closure actions passed into component, if available
    clicked() {
      this.get('onOpen')();
    },

    loaded() {
      this.get('onLoad')();
    },

    exited(error, metadata) {
      this.get('onExit')(error, metadata);
    },

    errored(err) {
      this.get('onError')(err);
    },

    succeeded(token, metadata) {
      this.get('onSuccess')(token, metadata);
    },

    eventEmitted(eventName, metadata) {
      this.get('onEvent')(eventName, metadata);
    }
  }
});
