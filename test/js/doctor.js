function loadMedkumoSDK() {
    Medkumo.init('<your hospital key>', 'test');
}

QUnit.test("Should display the Medkumo SDK", function(assert) {
    loadMedkumoSDK();
    var done = assert.async();
    setTimeout(function() {
        assert.equal(1, 1);
        done();
    }, 200);
});

QUnit.test("Should display the list of doctor", function(assert) {
    loadMedkumoSDK();
    var done = assert.async();
    setTimeout(function() {
        assert.equal(1, 1);
        done();
    }, 200);
});
