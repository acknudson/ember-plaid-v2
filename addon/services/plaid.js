import { Promise } from 'rsvp';
import Service from '@ember/service';

export default Service.extend({
  isLoading: false,
  isInjected: false,
  plaidPromise: null,

  /**
   * This method loads the Plaid the script. It can be safely called multiple times. If the script
   *   fails to load and the method is called again, the method will reattempt to load script.
   * @returns {Promise} a promise which resolves when the Plaid script loads and rejects when it
   *   does not.
   * @public
   */
  injectScript() {
    if (this.get('isLoading') || this.get('isInjected')) {
      return this.get('plaidPromise');
    } else {
      this.set('isLoading', true);
      const plaidPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://cdn.plaid.com/link/v2/stable/link-initialize.js';
        script.onload = resolve;
        script.onerror = reject;
        document.getElementsByTagName('head')[0].appendChild(script);
      })
      .then(() => {
        this.set('isInjected', true);
      })
      .finally(() => {
        this.set('isLoading', false);
      });
      this.set('plaidPromise', plaidPromise);
      return plaidPromise;
    }
  },

  /**
   * This method serves as a proxy to the Plaid link object open method. If it the Plaid script
   *   isn't loaded, it will try to the script first.
   * @param {object} [options] the parameters to pass to Plaid.create
   * @returns {Promise} a promise which resolves when the Plaid script loads and rejects when it
   *   does not. A resolve does not mean the user has linked their bank account.
   * @public
   */
  open(options) {
    return this.injectScript().then(() => window.Plaid.create(options).open());
  },
});
