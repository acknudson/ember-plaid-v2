import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
  events: A(),
  actions: {
    onError(err) {
      this.get('events').pushObject(`onError called with err ${JSON.stringify(err, ['message', 'arguments', 'type', 'name'])}`);
    },
    onOpen() {
      this.get('events').pushObject('onOpen called');
    },
    onLoad() {
      this.get('events').pushObject('onLoad called');
    },
    onEvent(eventName, metadata) {
      this.get('events').pushObject(`onEvent called with eventName ${eventName}, metadata ${JSON.stringify(metadata)}`);
    },
    onSuccess(token, metadata) {
      this.get('events').pushObject(`onSuccess called with token ${token}, metadata ${JSON.stringify(metadata)}`);
    },
    onExit(error, metadata) {
      this.get('events').pushObject(`onExit called with error ${error}, metadata ${JSON.stringify(metadata)}`);
    },
  }
});
