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
    Medkumo.showBookAnAppointment = function(hospitalKey, doctorKey, env) {
        if (typeof(env) == 'undefined') {
            env = 'prod';
        }
        console.log('executing init...');

        if (document.getElementById('medkumo-sdk-container') != null) {
            document.getElementById('medkumo-sdk-container').style.display = 'block';
            return;
        }

        loadConfig(hospitalKey, doctorKey, env);
        loadStylesheet('//' + Config.sdkBaseUrl + ':' + Config.port + '/css/medkumo.css');
        loadStylesheet('//' + Config.sdkBaseUrl + ':' + Config.port + '/css/medkumo.datetimepicker.css');
        loadScript('//' + Config.sdkBaseUrl + ':' + Config.port + '/lib/jquery-medkumo.js', function() {
            loadScript('//' + Config.sdkBaseUrl + ':' + Config.port + '/lib/medkumo.datetimepicker.full.js', renderBookAnAppointment)
        });
    };

    // render functions
    function renderContainer() {
        console.log('executing renderContainer...');

        var medkumoSdkContainer = '';
        medkumoSdkContainer += '<div id="medkumo-sdk-container">';
        medkumoSdkContainer += ' <div class="medkumo-sdk-header">'
        medkumoSdkContainer += '  <a class="medkumo-sdk-close-button" title="Close">x</a>';
        medkumoSdkContainer += ' </div>';
        medkumoSdkContainer += ' <div class="medkumo-sdk-body"></div>';
        medkumoSdkContainer += '</div>';

        // render
        Medkumo.jQuery("body").append(medkumoSdkContainer);
        //centerDiv('#medkumo-sdk-container');

        // event handlers
        containerEvents();
    }


    function renderBookAnAppointment() {
        renderContainer();
        console.log('executing renderBookAnAppointment...');
        var tblForm = '';
        tblForm += '<span class="medkumo-sdk-message"></span>';
        tblForm += '<div class="medkumo-sdk-book-an-appointment">'
        tblForm += '  <div class="medkumo-sdk-form-row medkumo-sdk-item-center">';
        tblForm += '    <img src="http://sdk.medkumo.loc:85/user.png" />';
        tblForm += '    <h4 class="">Dr Name</h4>';
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
        tblForm += '        <input name="appointmentDateAndTime" class="medkumo_datetime_picker" type="text" placeholder="Datetime">';
        tblForm += '      </label>';
        tblForm += '    </div>';
        tblForm += '    <div class="medkumo-sdk-form-row">';
        tblForm += '      <button type="submit" id="medkumo-sdk-form-row-book-button">Book</button>';
        tblForm += '    </div>';
        tblForm += '  </div>';
        tblForm += '  <div class="medkumo-sdk-clear"></div>';
        tblForm += '</div>';

        //render
        Medkumo.jQuery(".medkumo-sdk-body").html(tblForm);

        //event
        bookAnAppointmentEvents();
    }

    var renderMessage = {
        error: function(data, element) {
            if (typeof(element) == 'undefined') {
                element = '.medkumo-sdk-body';
            }
            Medkumo.jQuery(element).removeClass('medkumo-sdk-success');
            Medkumo.jQuery(element).addClass('medkumo-sdk-error');
            Medkumo.jQuery(element).html(data);
        },
        success: function(data, element) {
            if (typeof(element) == 'undefined') {
                element = '.medkumo-sdk-body';
            }
            Medkumo.jQuery(element).removeClass('medkumo-sdk-error');
            Medkumo.jQuery(element).addClass('medkumo-sdk-success');
            Medkumo.jQuery(element).html(data);
        }
    };
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
            Medkumo.jQuery(this).parents('#medkumo-sdk-container').hide();
        });
        Medkumo.jQuery(document).on('click', '.medkumo-sdk-button-booking', function() {
            checkHospitalKey();
        });
        // Medkumo.jQuery(window).resize(function() {
        //     centerDiv('#medkumo-sdk-container');
        // });

    }

    function bookAnAppointmentEvents() {
        Medkumo.jQuery('.medkumo_datetime_picker').datetimepicker({
            minDate: 0, // today
            disabledDates: ['10.12.2016', '11.12.2016', '13.12.2016'],
            formatDate: 'd.m.Y',
            allowTimes: [
                '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
                '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
            ]
        });
        Medkumo.jQuery(document).on("click", "#medkumo-sdk-form-row-book-button", function() {
            var patientName = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientName"]').val(),
                patientAge = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').val(),
                patientMobile = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMobile"]').val(),
                patientMail = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').val(),
                appointmentDateAndTime = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="appointmentDateAndTime"]').val(),
                appointmentDate = "",
                appointmentTime = "";

            if (validateBookAnAppointment() === false) {
                renderMessage.error('You must enter the valid data !', '.medkumo-sdk-message');
                return;
            } else {
                Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input').removeClass('input-error');
            }
            if (appointmentDateAndTime.split(' ').length > 1) {
                appointmentDate = appointmentDateAndTime.split(' ')[0];
                appointmentTime = appointmentDateAndTime.split(' ')[1];
            }

            var jsonData = {
                "hospital_key": "8cfc7a0b788a513756f58fae3f3d1612c8cd381b",
                "doctor_key": "142a3713c6a14e61466aa6a8d4621c66abbc6a7a",
                "appointment_date": appointmentDate,
                "appointment_time": appointmentTime,
                "patient_id": "",
                "name": patientName,
                "age": patientAge,
                "gender": "1",
                "dob": "30/07/1984",
                "mobile_number": patientMobile,
                "email": patientMail
            };
            console.log('jsonData: ', jsonData);
            Medkumo.jQuery.ajax({
                type: 'POST',
                url: Config.apiBookAnAppointment,
                data: JSON.stringify(jsonData),
                success: function(data) {
                    console.log('data: ', data);
                    if (data && data.code === "1") {
                        renderMessage.success(data.data, '.medkumo-sdk-message');
                    } else {
                        renderMessage.error(data.data, '.medkumo-sdk-message');
                    }

                },
                error: function(data) {
                    console.log('data: ', data);
                    renderMessage.error(data, '.medkumo-sdk-message');
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: 'json'
            });
        });
    }

    function checkHospitalKey(hospitalKey, doctorKey) {
        console.log('executing checkHospitalKey...');
        console.log(Config.hospitalKey);
        var jsonData = {
            "hospital_key": "8cfc7a0b788a513756f58fae3f3d1612c8cd381b",
            "doctor_key": "142a3713c6a14e61466aa6a8d4621c66abbc6a7a"
        };
        Medkumo.jQuery.ajax({
            type: 'POST',
            url: Config.apiCheckHospitalAndDoctorDetails,
            data: JSON.stringify(jsonData),
            success: function(data) {
                console.log('data: ', data);
                if (data.code === '1') {
                    renderBookAnAppointment();
                } else {
                    alert(data.message);
                }
            },
            error: function(data) {
                console.log('data: ', data);
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: 'json'
        });
    }

    function postAnAppointment(data) {
        console.log('executing postAnAppointment...');
        console.log(data);
    }

    function centerDiv(obj) {
        Medkumo.jQuery(obj).css({
            "position": "absolute",
            "right": "auto",
            "bottom": "auto"
        });
        Medkumo.jQuery(obj).css("top", Math.max(0, ((Medkumo.jQuery(window).height() - Medkumo.jQuery(obj).outerHeight()) / 2) +
            Medkumo.jQuery(window).scrollTop()) + "px");
        Medkumo.jQuery(obj).css("left", Math.max(0, ((Medkumo.jQuery(window).width() - Medkumo.jQuery(obj).outerWidth()) / 2) +
            Medkumo.jQuery(window).scrollLeft()) + "px");
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

    function loadConfig(hospitalKey, doctorKey, env) {
        var sdkBaseUrl = 'sdk.medkumo.loc',
            port = window.location.port,
            apiCheckHospitalAndDoctorDetails,
            apiBookAnAppointment;
        if (env == 'prod') {
            apiCheckHospitalAndDoctorDetails = 'http://54.169.72.195/WebAppAPI/doctorApp.php/api/v1/doctor/checkHospitalAndDoctorDetails';
            apiBookAnAppointment = 'http://54.169.72.195/WebAppAPI/doctorApp.php/api/v1/doctor/bookAppointmnet';
        } else {
            apiCheckHospitalAndDoctorDetails = '/test/data/checkHospitalAndDoctorDetails.json';
            apiBookAnAppointment = '/test/data/appointment.json';
        }

        Config = {
            sdkBaseUrl: sdkBaseUrl,
            port: port,
            apiCheckHospitalAndDoctorDetails: apiCheckHospitalAndDoctorDetails,
            apiBookAnAppointment: apiBookAnAppointment,
            hospitalKey: hospitalKey,
            doctorKey: doctorKey
        };
    }

    window.Medkumo = Medkumo;
})(this);
