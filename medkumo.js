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
            doc += '<div class="form_list_item">';
            doc += '<img src=' + doctor.avatar + ' width="15%;">';
            doc += '<br>'
            doc += '<label>' + doctor.doctor_name + '</label>';
            doc += '<br>';
            doc += '<button data-doctor-key="' + doctor.doctor_key + '"  data-doctor-name="' + doctor.doctor_name + '"  data-doctor-avatar="' + doctor.avatar + '" class="medkumo-sdk-book-an-appointment btn_Style">Book An Appointment</button>';
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
        tblForm += '<div id="medkumo-sdk-book-an-appointment-form" class="BaP_Form_Book_Appointment">';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left">';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left_Row">';
        tblForm += '<p>Name:</p>';
        tblForm += '<input name="patientName" id="BaP_Form_Book_Appointment_Left_Name" type="text" placeholder="Patient Name"/>';
        tblForm += '</div>';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left_Row">';
        tblForm += '<p>Age:</p>';
        tblForm += '<input name="patientAge" id="BaP_Form_Book_Appointment_Left_Age" type="text" placeholder="Patient Age"/>';
        tblForm += '</div>';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left_Row">';
        tblForm += '<p>Mobile:</p>';
        tblForm += '<input name="patientMobile" id="BaP_Form_Book_Appointment_Left_Mobile" type="text" placeholder="Mobile"/>';
        tblForm += '</div>';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left_Row">';
        tblForm += '<p>Email:</p>';
        tblForm += '<input name="patientMail" id="BaP_Form_Book_Appointment_Left_Email" type="text" placeholder="Email"/>';
        tblForm += '</div>';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left_Row">';
        tblForm += '<p class="appoinment">Appointment Date & Time:</p>';
        tblForm += '<input name="appointmentDateAndTime" id="BaP_Form_Book_Appointment_Bottom_DateTime" type="text" placeholder="Datetime"/>';
        tblForm += '</div>';
        tblForm += '<div class="BaP_Form_Book_Appointment_Left_Row">';
        tblForm += '<button id="medkumo-sdk-btn-book" json-data="' + encodeURIComponent(JSON.stringify(doctor)) + '" class="btn_Style">Book</button>';
        tblForm += '<button id="medkumo-sdk-btn-back" class="btn_Style">Back</button>';
        tblForm += '</div>';
        tblForm += '</div>';
        tblForm += '<div class="BaP_Form_Book_Appointment_Right">';
        tblForm += '<img class="imageChange" src=' + doctor.doctor_avatar + ' width="5%;"/>';
        tblForm += '<br/>';
        tblForm += '<span>' + doctor.doctor_name + '</span>';
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
        if (!ele) {
            ele = '.medkumo-sdk-body';
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
        Medkumo.jQuery(ele).addClass('medkumo-sdk-error');
        Medkumo.jQuery(ele).html(data);
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
        Medkumo.jQuery(document).on("click", "#medkumo-sdk-btn-book", function() {
            var patientName = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientName"]').val();
            var patientAge = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientAge"]').val();
            var patientMobile = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMobile"]').val();
            var patientMail = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="patientMail"]').val();
            var appointmentDateAndTime = Medkumo.jQuery('#medkumo-sdk-book-an-appointment-form input[name="appointmentDateAndTime"]').val();
            var doctor = JSON.parse(decodeURIComponent(Medkumo.jQuery(this).attr('json-data')));
            console.log('patientName:', patientName);
            console.log('patientAge:', patientAge);
            console.log('patientMail:', patientMail);
            console.log('patientMobile:', patientMobile);
            console.log('appointmentDateAndTime:', appointmentDateAndTime);
            console.log('doctor:', doctor);
            renderSuccess('.medkumo-sdk-message', 'You book success with Dr Virah!');
        });

        Medkumo.jQuery(document).on("click", "#medkumo-sdk-btn-back", function() {
            getListOfDoctor();
        });
    }

    function listOfDoctorEvents() {
        Medkumo.jQuery(document).on("click", ".medkumo-sdk-book-an-appointment", function() {
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
