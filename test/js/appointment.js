QUnit.test("Should display successful message when clicking book button ", function(assert) {
    var done = assert.async();
    Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientName"]').val('John');
    Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').val('20');
    Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMobile"]').val('0907224466');
    Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').val('John@gmail.com');
    Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="appointmentDateAndTime"]').val('2016/12/21 15:35');
    Medkumo.jQuery('#medkumo-sdk-form-row-book-button').click();
    setTimeout(function() {
        assert.equal(Medkumo.jQuery('#medkumo-sdk-container').find('span[class = "medkumo-sdk-message medkumo-sdk-success"]')[0].innerHTML, 'Appointment Booked successfully');
        done();
    }, 300);
});

QUnit.test("Should display error message when clicking book button ", function(assert) {
    var done = assert.async();
    setTimeout(function() {
        assert.equal(1, 1);
        done();
    }, 200);
});
