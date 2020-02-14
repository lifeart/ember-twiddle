import { set, get, getProperties } from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Model | Settings', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    window.localStorage.clear();
  });

  hooks.afterEach(function() {
    window.localStorage.clear();
  });

  test('it has default settings when no local settings are present', function(assert) {
    assert.expect(1);

    const settings = run(() => this.owner.lookup('service:store').createRecord('settings'));

    assert.deepEqual(getProperties(settings, 'keyMap'), {
      keyMap: 'default'
    }, 'default settings are present');
  });

  test('settings stored in localStorage override default settings', function(assert) {
    assert.expect(1);

    const localSettings = JSON.stringify({ keyMap: 'vim' });
    window.localStorage.setItem('ember_twiddle_settings', localSettings);

    const settings = run(() => this.owner.lookup('service:store').createRecord('settings'));

    assert.deepEqual(getProperties(settings, 'keyMap'), {
      keyMap: 'vim'
    }, 'local settings overrode default settings');
  });

  test('save() persists settings to localStorage', function(assert) {
    assert.expect(1);

    const settings = run(() => this.owner.lookup('service:store').createRecord('settings'));

    set(settings, 'keyMap', 'emacs');
    settings.save();

    const anotherSettings = run(() => this.owner.lookup('service:store').createRecord('settings'));
    assert.equal(get(anotherSettings, 'keyMap'), 'emacs',
      'new Settings has previously persisted settings');
  });
});
