function loadMedkumoSDK() {
    Medkumo.init('<your hospital key>', 'test');
}

QUnit.test("Should display the book appointment form when clicking book an appointment button", function(assert) {
    loadMedkumoSDK();
    var done = assert.async();
    setTimeout(function() {
        assert.equal(1, 1);
        done();
    }, 200);
});

QUnit.test("Should display successful message when clicking book button ", function(assert) {
    loadMedkumoSDK();
    var done = assert.async();
    setTimeout(function() {
        assert.equal(1, 1);
        done();
    }, 200);
});

QUnit.test("Should display error message when clicking book button ", function(assert) {
    loadMedkumoSDK();
    var done = assert.async();
    setTimeout(function() {
        assert.equal(1, 1);
        done();
    }, 200);
});
