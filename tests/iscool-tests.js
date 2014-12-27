var assert = require('assert');
var createIsCool = require('../iscool');

suite('Extended blacklist', function extendedBlacklistSuite() {
  test('Basic test', function basicTest() {
    var isCool = createIsCool();
    assert.ok(!isCool('transgender')); // Not OK as a noun.
    assert.ok(!isCool('swastika'));
    assert.ok(!isCool('nazi'));
    assert.ok(!isCool('holocaust'));
  });

  test('Test case insensitivity', function testCaseInsensitivity() {
    var isCool = createIsCool();
    assert.ok(isCool('jello'));
    assert.ok(isCool('Jello'));
    assert.ok(!isCool('Negro'));
    assert.ok(!isCool('negro'));
    assert.ok(!isCool('Coon'));
    assert.ok(!isCool('coon'));
  });

  test('Custom blacklist', function testCustomBlacklist() {
    var isCool = createIsCool({
      customBlacklist: [
        'hastur',
        'voldemort'
      ]
    });
    assert.ok(!isCool('hastur'));
    assert.ok(!isCool('Voldemort'));
    assert.ok(isCool('Old Scratch'));
    assert.ok(!isCool('nazi'));
  });
});

suite('Tragedy mode', function tragedySuite() {  
  test('Tragedy mode on', function tragedyTest() {
    var isCool = createIsCool({
      tragedyHappenedRecently: true
    });
    assert.ok(!isCool('chokehold'));
    assert.ok(!isCool('coroner'));
    assert.ok(!isCool('eric'));
    assert.ok(!isCool('garner'));
    assert.ok(!isCool('torture'));
    assert.ok(!isCool('torturer'));
  });

  test('Tragedy mode off', function tragedyOffTest() {
    var isCool = createIsCool({
      tragedyHappenedRecently: false
    });
    assert.ok(isCool('chokehold'));
    assert.ok(isCool('coroner'));
    assert.ok(isCool('eric'));
    assert.ok(isCool('garner'));
    assert.ok(isCool('torture'));
    assert.ok(isCool('torturer'));
  });
});

suite('False positives', function falsePositivesSuite() {
  test('Test false positives', function testFalsePositives() {
    var isCool = createIsCool({
      tragedyHappenedRecently: false
    });

    assert.ok(!isCool('IO'));
    assert.ok(isCool('iOS'));
    assert.ok(!isCool('imo'));
    assert.ok(!isCool('IMO'));
  });
});

suite('Custom logger', function loggerSuite() {
  test('Test using a custom logger', function testCustomLogger() {
    var textLogged;
    var isCool = createIsCool({
      logger: {
        log: function customLog(text) {
          textLogged = text;
        }
      },
      customBlacklist: [
        'angularjs'
      ]
    });

    isCool('angularjs');

    assert.equal(textLogged, 'Uncool word: angularjs');
  });
});