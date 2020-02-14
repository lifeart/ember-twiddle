import { run } from '@ember/runloop';
import Ember from 'ember';
import RSVP from 'rsvp';
import { settled } from '@ember/test-helpers';

const {
  Test
} = Ember;

function hasNoIframe() {
  return this.app.testHelpers.find('iframe').length > 0;
}

export default function(app) {
  let ctx = { app };
  Test.registerWaiter(ctx, hasNoIframe);

  return settled().then(() => {
    Test.unregisterWaiter(ctx, hasNoIframe);
    return RSVP.resolve();
  }).then(() => {
    return new RSVP.Promise(function (resolve) {
      run.later(resolve, 10);
    });
  });
}
