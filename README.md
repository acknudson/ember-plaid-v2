# ember-plaid-v2

[Plaid's](https://plaid.com/) drop-in Link module as an Ember component.

## Installation

```bash
# From within your ember-cli project
ember install ember-plaid-v2
```

## Configuration

```javascript
// config/environment.js
ENV['ember-plaid-v2'] = {
  clientName: 'REQUIRED',
  product: 'auth',
  key: 'test_key',
  env: 'tartan'
};
```

Check the [Link Docs](https://github.com/plaid/link#custom-integration) for all of the parameter options.

## Usage

```hbs
{{plaid-link onSuccess=(action "onSuccess")}}
```
Or
```hbs
{{#plaid-link onSuccess=(action "onSuccess")}}
  Click to Link Your Bank Account
{{/plaid-link}}
```
The Link component can accept the following closure actions that it will call after the corresponding event:

* [onSuccess](https://plaid.com/docs/api/#onsuccess-callback)
* [onOpen](https://plaid.com/docs/api/#open-function)
* [onLoad](https://plaid.com/docs/api/#parameter-reference)
* [onExit](https://plaid.com/docs/api/#onexit-callback)
* [onEvent](https://plaid.com/docs/#onevent-callback)
* [onError] (not supported by plaid, custom-built logic will fire this if plaid script fails to load.)

Once a user has successfully onboarded via Plaid Link, the `onSuccess` action will be called with the `public_token` and a `metadata` object passed as the arguments. From there, you should follow the [instructions](https://github.com/plaid/link#step-3-write-server-side-handler) for exchanging the `public_token` for an `access_token`.

Once you have the `public_token`, you can use it to initialize a plaid-link component in "update mode". Update mode allows the user to update Plaid when they change their online-banking credentials or MFA.

```hbs
{{plaid-link
  onSuccess=(action "onSuccess")
  token=$public_token}}
```
Or
```hbs
{{#plaid-link onSuccess=(action "onSuccess") token=$public_token}}
  Update Bank Account
{{/plaid-link}}
```

# Contributing
## Installation
* `git clone <repository-url>` this repository
* `cd ember-plaid-v2`
* install bower through brew
* `bower install ember`

* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests
<!-- TODO re-add yarn test once I figure it out -->
<!-- * `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions) -->

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Credits
Code based on original Ember Plaid component written by Jason Kriss: https://github.com/ragnarpeterson/ember-plaid
