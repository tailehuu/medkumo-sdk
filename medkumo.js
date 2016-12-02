/*
 * Medkumo Javascript SDK
 *
 */
(function(window, undefined) {
    var Medkumo = {},
        Config = {};

    if (window.Medkumo) {
        return;
    }
    Medkumo.init = function(key, env = 'prod') {
        console.log('executing init...');
        console.log('hospitalKey: ' + key);

        loadConfig(key, env);
        loadStylesheet('//' + Config.sdkBaseUrl + ':' + Config.port + '/medkumo.css');
        loadScript('//' + Config.sdkBaseUrl + ':' + Config.port + '/lib/jquery-medkumo.js', renderContainer);
    };

    // render functions
    function renderContainer() {
        console.log('executing renderContainer...');

        var medkumoSdkContainer = '';
        medkumoSdkContainer += '<div id="medkumo-sdk-container" class=""></div>';

        // render
        Medkumo.jQuery("body").append(medkumoSdkContainer);
        Medkumo.jQuery("#medkumo-sdk-container").html(Config.btnBooking);

        // event handlers
        containerEvents();
    }

    function renderListOfDoctor(doctors) {
        console.log('executing renderListOfDoctor...');

        var doc = '';
        doctors.map(function(doctor, index) {
            doc += '<div class="medkumo-sdk-item">';
            doc += ' <img src=' + doctor.avatar + ' width="15%;">';
            doc += ' <br>'
            doc += ' <label>' + doctor.name + '</label>';
            doc += ' <br>';
            doc += ' <button data-doctor-key="' + doctor.doctor_key + '"  data-doctor-name="' + doctor.name + '"  data-doctor-avatar="' + doctor.avatar + '" class="medkumo-sdk-book-an-appointment-button">Book An Appointment</button>';
            doc += '</div>';
        })

        // render
        Medkumo.jQuery("#medkumo-sdk-container").html(Config.layoutContent);
        Medkumo.jQuery(".medkumo-sdk-body").html('<div class="medkumo-sdk-list-of-doctor"></div>');
        Medkumo.jQuery('.medkumo-sdk-list-of-doctor').append(doc);
        Medkumo.jQuery('.medkumo-sdk-list-of-doctor').append('<div class="medkumo-sdk-clear"></div>');

        // event handlers
        listOfDoctorEvents();
    }

    function renderBookAnAppointment(doctor) {
        console.log('executing renderBookAnAppointment...');
        var tblForm = '';
        tblForm += '<span class="medkumo-sdk-message"></span>';
        tblForm += '<div class="medkumo-sdk-book-an-appointment">'
        tblForm += '  <div class="medkumo-sdk-form-row medkumo-sdk-item-center">';
        tblForm += '    <img src="' + doctor.doctor_avatar + '" />';
        tblForm += '    <h4 class="">' + doctor.name + '</h4>';
        tblForm += '  </div>';
        tblForm += '  <div id="medkumo-sdk-book-an-appointment-form" class="medkumo-sdk-book-an-appointment">';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <label>';
        tblForm += '        <input name="patientName" type="text" placeholder="Patient Name">';
        tblForm += '      </label>';
        tblForm += '    </div>';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <label>';
        tblForm += '        <input name="patientAge" class="medkumo-sdk-form-row-age-input" type="text" placeholder="Patient Age">';
        tblForm += '      </label>';
        tblForm += '    </div>';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <label>';
        tblForm += '        <input name="patientMobile" type="text" placeholder="Mobile">';
        tblForm += '      </label>';
        tblForm += '    </div>';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <label>';
        tblForm += '        <input name="patientMail" class="medkumo-sdk-form-row-email-input" type="text" placeholder="Email">';
        tblForm += '      </label>';
        tblForm += '    </div>';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <label>';
        tblForm += '        <input name="appointmentDateAndTime" type="text" placeholder="Datetime">';
        tblForm += '      </label>';
        tblForm += '    </div>';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <button type="submit" id="medkumo-sdk-form-row-book-button">Book</button>';
        tblForm += '      <button type="submit" id="medkumo-sdk-form-row-back-button">Back</button>';
        tblForm += '    </div>';
        tblForm += '  </div>';
        tblForm += '  <div class="medkumo-sdk-clear"></div>';
        tblForm += '</div>';

        //render
        Medkumo.jQuery("#medkumo-sdk-container").html(Config.layoutContent);
        Medkumo.jQuery(".medkumo-sdk-body").html(tblForm);

        //event
        bookAnAppointmentEvents();
    }

    function renderMessage(isError, data, element = '.medkumo-sdk-body') {
        console.log('executing renderMessage...');
        console.log(data);

        if (Medkumo.jQuery(element).length == 0) {
            Medkumo.jQuery("#medkumo-sdk-container").html(Config.layoutContent);
        }
        if (isError) {
            Medkumo.jQuery(element).removeClass('medkumo-sdk-success');
            Medkumo.jQuery(element).addClass('medkumo-sdk-error');
        } else {
            Medkumo.jQuery(element).removeClass('medkumo-sdk-error');
            Medkumo.jQuery(element).addClass('medkumo-sdk-success');
        }
        Medkumo.jQuery(element).html(data);
    }

    // validation functions
    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    function validateBookAnAppointment() {
        var result = true;
        var patientName = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientName"]').val(),
            patientAge = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').val(),
            patientMobile = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMobile"]').val(),
            patientMail = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').val(),
            appointmentDateAndTime = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="appointmentDateAndTime"]').val();
        if (patientAge != parseInt(patientAge, 10) || patientAge < 18 || patientAge > 100) {
            Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').addClass("input-error");
            result = false;
        } else {
            Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').removeClass("input-error");
        }
        if (!isValidEmailAddress(patientMail)) {
            Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').addClass("input-error");
            result = false;
        } else {
            Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').removeClass("input-error");
        }
        return result;
    }

    // event functions
    function containerEvents() {
        Medkumo.jQuery(document).on('click', '.medkumo-sdk-close-button', function() {
            Medkumo.jQuery(this).parents('#medkumo-sdk-container').html(Config.btnBooking);
        });
        Medkumo.jQuery(document).on('click', '.medkumo-sdk-button-booking', function() {
            getListOfDoctor();
        });
    }

    function bookAnAppointmentEvents() {
        Medkumo.jQuery(document).on("click", "#medkumo-sdk-form-row-book-button", function() {
            var patientName = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientName"]').val(),
                patientAge = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').val(),
                patientMobile = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMobile"]').val(),
                patientMail = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').val(),
                appointmentDateAndTime = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="appointmentDateAndTime"]').val();

            var doctor_key = Medkumo.jQuery(this).data('doctor-key'),
                doctor_name = Medkumo.jQuery(this).data('doctor-name'),
                doctor_avatar = Medkumo.jQuery(this).data('doctor-avatar');
            if (validateBookAnAppointment() === false) {
                renderMessage(true, 'You must enter the valid data !', '.medkumo-sdk-message');
                return;
            } else {
                Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input').removeClass('input-error');
            }
            var jsonData = {
                "hospital_access_key": Config.hospitalKey,
                "doctor_access_key": doctor_key,
                "detail": {
                    "patient_name": patientName,
                    "patient_age": patientAge,
                    "mobile_number": patientMobile,
                    "email_id": patientMail,
                    "appointment_date": appointmentDateAndTime
                }
            };
            Medkumo.jQuery.ajax({
                type: 'POST',
                url: Config.apiBookAnAppointment,
                data: JSON.stringify(jsonData),
                success: function(data) {
                    console.log('data: ', data);
                    if (data && data.code === 1) {
                        renderMessage(false, data.message, '.medkumo-sdk-message');
                    } else {
                        renderMessage(true, data.message, '.medkumo-sdk-message');
                    }

                },
                error: function(data) {
                    console.log('data: ', data);
                    renderMessage(true, data, '.medkumo-sdk-message');
                },
                contentType: "application/json",
                dataType: 'json'
            });
        });

        Medkumo.jQuery(document).on("click", "#medkumo-sdk-form-row-back-button", function() {
            getListOfDoctor();
        });
    }

    function listOfDoctorEvents() {
        Medkumo.jQuery(document).on("click", ".medkumo-sdk-book-an-appointment-button", function() {
            var doctor_key = Medkumo.jQuery(this).data('doctor-key'),
                doctor_name = Medkumo.jQuery(this).data('doctor-name'),
                doctor_avatar = Medkumo.jQuery(this).data('doctor-avatar');

            renderBookAnAppointment({
                "doctor_key": doctor_key,
                "name": doctor_name,
                "doctor_avatar": doctor_avatar
            });
        });
    }

    function checkHospitalKey() {
        console.log('executing checkHospitalKey...');
        console.log(Config.hospitalKey);
        return true;
    }

    function getListOfDoctor() {
        console.log('executing getListOfDoctor...');

        if (checkHospitalKey()) {
            Medkumo.jQuery.ajax({
                url: Config.apiListOfDoctor,
                type: "GET",
                dataType: "json",
                success: function(doctors) {
                    renderListOfDoctor(doctors);
                },
                error: function(xhr, status, error) {
                    renderMessage(true, "Can't get the list of doctor !");
                }
            });
        } else {
            renderMessage(true, 'Hospital Key ' + Config.hospitalKey + ' is not exist !');
        }
    }

    function postAnAppointment(data) {
        console.log('executing postAnAppointment...');
        console.log(data);
    }

    function loadScript(src, callback) {
        console.log('executing loadScript...');
        var script, isReady;
        isReady = false;
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        script.onload = script.onreadystatechange = function() {
            if (!isReady && (!this.readyState || this.readyState == 'complete')) {
                isReady = true;
                callback();
            }
        };
        document.body.appendChild(script);
    }

    function loadStylesheet(url) {
        console.log('executing loadStylesheet...');
        var link, entry;
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(link, entry);
    }

    function loadConfig(hospitalKey, env) {
        var apiBaseUrl,
            sdkBaseUrl = 'sdk.medkumo.loc',
            port = window.location.port,
            apiListOfDoctor,
            apiBookAnAppointment,
            layoutContent = ' <div class="medkumo-sdk-header"><a class="medkumo-sdk-close-button" title="Close">x</a></div><div class="medkumo-sdk-body"></div>',
            btnBooking = '<button  class="medkumo-sdk-button-booking">Booking</button>';
        if (env == 'prod') {
            apiBaseUrl = 'api.medkumo.loc';
            apiListOfDoctor = '//' + apiBaseUrl + ':' + port + '/index.php?name=list_doctor';
            apiBookAnAppointment = '//' + apiBaseUrl + ':' + port + '/index.php?name=book_appointment';
        } else {
            apiBaseUrl = '';
            apiListOfDoctor = '/test/data/doctor.json';
            apiBookAnAppointment = '/test/data/appointment.json';
        }

        Config = {
            apiBaseUrl: apiBaseUrl,
            sdkBaseUrl: sdkBaseUrl,
            port: port,
            apiListOfDoctor: apiListOfDoctor,
            apiBookAnAppointment: apiBookAnAppointment,
            hospitalKey: hospitalKey,
            layoutContent: layoutContent,
            btnBooking: btnBooking
        };
    }

    window.Medkumo = Medkumo;
})(this);

if (typeof window.Medkumo_ready === 'function') {
    window.Medkumo_ready();
    delete window.Medkumo_ready;
}
