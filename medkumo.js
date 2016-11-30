/*
 * Medkumo Javascript SDK
 *
 */
(function(window, undefined) {
    var Medkumo = {},
        hospitalKey = '';

    if (window.Medkumo) {
        return;
    }
    const PORT = window.location.port;
    const SDK_BASE_URL = 'sdk.medkumo.loc';

    const API_BASE_URL = 'api.medkumo.loc';
    const API_LIST_OF_DOCTOR = '//' + API_BASE_URL + ':' + PORT + '/index.php?name=list_doctor';
    const API_BOOK_AN_APPOINTMENT = '//' + API_BASE_URL + ':' + PORT + '/index.php?name=book_appointment';

    Medkumo.init = function(key) {
        console.log('executing init...');
        console.log('hospitalKey: ' + key);

        hospitalKey = key;
        loadStylesheet('//' + SDK_BASE_URL + ':' + PORT + '/medkumo.css');
        loadScript('//' + SDK_BASE_URL + ':' + PORT + '/lib/jquery-medkumo.js', renderContainer);
    };

    // render functions
    function renderContainer() {
        console.log('executing renderContainer...');

        var medkumoSdkContainer = '';
        medkumoSdkContainer += '<div id="medkumo-sdk-container" class="">';
        medkumoSdkContainer += ' <div class="medkumo-sdk-header">';
        medkumoSdkContainer += '  <a class="medkumo-sdk-header-minimize-button medkumo-sdk-header-button" title="Minimize">&#8211;</a>';
        medkumoSdkContainer += '  <a class="medkumo-sdk-header-maximize-button medkumo-sdk-header-button" title="Maximize">+</a>';
        medkumoSdkContainer += '  <a class="medkumo-sdk-header-close-button medkumo-sdk-header-button" title="Close">x</a>';
        medkumoSdkContainer += ' </div>';
        medkumoSdkContainer += ' <div class="medkumo-sdk-body"></div>';
        medkumoSdkContainer += '</div>';

        // render
        Medkumo.jQuery("body").append(medkumoSdkContainer);
        getListOfDoctor();

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
            doc += ' <label>' + doctor.doctor_name + '</label>';
            doc += ' <br>';
            doc += ' <button data-doctor-key="' + doctor.doctor_key + '"  data-doctor-name="' + doctor.doctor_name + '"  data-doctor-avatar="' + doctor.avatar + '" class="medkumo-sdk-book-an-appointment-button">Book An Appointment</button>';
            doc += '</div>';
        })

        // render
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

        tblForm += '<div class="medkumo-sdk-user-detail">';
        tblForm += '<img src="' + doctor.doctor_avatar + '" width="15%;" />';
        tblForm += '<br/>';
        tblForm += '<span class="">' + doctor.doctor_name + '</span>';
        tblForm += '</div>';
        tblForm += '<div id="medkumo-sdk-book-an-appointment-form" class="medkumo-sdk-book-an-appointment">';
        tblForm += '<div class="medkumo-sdk-form-row">';
        tblForm += '<label>';
        tblForm += '<span>Name: </span>';
        tblForm += '<input name="patientName" type="text" placeholder="Patient Name">';
        tblForm += '</label>';
        tblForm += '</div>';
        tblForm += '<div class="medkumo-sdk-form-row">';
        tblForm += '<label>';
        tblForm += '<span>Age: </span>';
        tblForm += '<input name="patientAge" class="medkumo-sdk-form-row-age-input" type="text" placeholder="Patient Age">';
        tblForm += '</label>';
        tblForm += '</div>';
        tblForm += '<div class="medkumo-sdk-form-row">';
        tblForm += '<label>';
        tblForm += '<span class="medkumo-sdk-form-row-mobile-span">Mobile: </span>';
        tblForm += '<input name="patientMobile" type="text" placeholder="Mobile">';
        tblForm += '</label>';
        tblForm += '</div>';
        tblForm += '<div class="medkumo-sdk-form-row">';
        tblForm += '<label>';
        tblForm += '<span>Email: </span>';
        tblForm += '<input name="patientMail" class="medkumo-sdk-form-row-email-input" type="text" placeholder="Email">';
        tblForm += '</label>';
        tblForm += '</div>';
        tblForm += '<div class="medkumo-sdk-form-row">';
        tblForm += '<label>';
        tblForm += '<span>Appointment Date & Time: </span>';
        tblForm += '<input name="appointmentDateAndTime" type="text" placeholder="Datetime">';
        tblForm += '</label>';
        tblForm += '</div>';
        tblForm += '<div class="medkumo-sdk-form-row">';
        tblForm += '<button type="submit" id="medkumo-sdk-form-row-book-button">Book</button>';
        tblForm += '<button type="submit" id="medkumo-sdk-form-row-back-button">Back</button>';
        tblForm += '</div>';
        tblForm += '</div>';
        tblForm += '<div class="medkumo-sdk-clear"></div>';

        //render
        Medkumo.jQuery(".medkumo-sdk-body").html(tblForm);

        //event
        bookAnAppointmentEvents();
    }

    function renderSuccess(element, data) {
        console.log('executing renderSuccess...');
        console.log(data);
        if (!element) {
            element = '.medkumo-sdk-body';
        }
        Medkumo.jQuery(element).addClass('medkumo-sdk-success');
        Medkumo.jQuery(element).html(data);
    }

    function renderError(element, data) {
        console.log('executing renderError...');
        console.log(data);
        if (!element) {
            element = '.medkumo-sdk-body';
        }
        Medkumo.jQuery(element).addClass('medkumo-sdk-error');
        Medkumo.jQuery(element).html(data);
    }

    // event functions
    function containerEvents() {
        Medkumo.jQuery(document).on('click', '.medkumo-sdk-header-minimize-button', function() {
            Medkumo.jQuery(this).parents('#medkumo-sdk-container').addClass('medkumo-sdk-body-minimize');
            Medkumo.jQuery('.medkumo-sdk-header-maximize-button').show();
            Medkumo.jQuery(this).hide();
        });
        Medkumo.jQuery(document).on('click', '.medkumo-sdk-header-maximize-button', function() {
            Medkumo.jQuery(this).parents('#medkumo-sdk-container').removeClass('medkumo-sdk-body-minimize');
            Medkumo.jQuery('.medkumo-sdk-header-minimize-button').show();
            Medkumo.jQuery(this).hide();
        });
        Medkumo.jQuery(document).on('click', '.medkumo-sdk-header-close-button', function() {
            Medkumo.jQuery(this).parents('#medkumo-sdk-container').hide();
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

            var jsonData = {
                "hospital_access_key": hospitalKey,
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
                url: API_BOOK_AN_APPOINTMENT,
                data: JSON.stringify(jsonData),
                success: function(data) {
                    console.log('data: ', data);
                    if (data && data.code === 1) {
                        renderSuccess('.medkumo-sdk-message', data.message);
                    } else {
                        renderError('.medkumo-sdk-message', data.message);
                    }

                },
                error: function(data) {
                    console.log('data: ', data);
                    renderError('.medkumo-sdk-message', data);
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
                "doctor_name": doctor_name,
                "doctor_avatar": doctor_avatar
            });
        });
    }

    function checkHospitalKey() {
        console.log('executing checkHospitalKey...');
        console.log(hospitalKey);
        return true;
    }

    function getListOfDoctor() {
        console.log('executing getListOfDoctor...');

        if (checkHospitalKey()) {
            Medkumo.jQuery.getJSON(API_LIST_OF_DOCTOR, function(doctors) {
                renderListOfDoctor(doctors);
            });
        } else {
            renderError(null, 'Hospital Key ' + hospitalKey + ' is not exist !');
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

    window.Medkumo = Medkumo;
})(this);

if (typeof window.Medkumo_ready === 'function') {
    window.Medkumo_ready();
    delete window.Medkumo_ready;
}
