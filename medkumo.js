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
        loadScript('//' + SDK_BASE_URL + ':' + PORT + '/lib/jquery-medkumo.js', renderMedkumo);
    };

    function renderMedkumo() {
        console.log('executing renderMedkumo...');

        var medkumoSdkContainer = document.createElement('div');
        medkumoSdkContainer.setAttribute("id", "medkumo-sdk-container");
        document.body.appendChild(medkumoSdkContainer);
        getListOfDoctor();
    }

    function checkHospitalKey() {
        console.log('executing checkHospitalKey...');
        console.log(hospitalKey);
        return false;
    }

    function getListOfDoctor() {
        console.log('executing getListOfDoctor...');

        if (checkHospitalKey()) {
            Medkumo.jQuery.getJSON(API_LIST_OF_DOCTOR, function(doctors) {
                renderListOfDoctor(doctors)
            });
        } else {
            renderError('Hospital Key ' + hospitalKey + ' is not exist !');
        }
    }

    function renderListOfDoctor(doctors) {
        console.log('executing renderListOfDoctor...');

        var doc = '';
        doctors.map(function(doctor, index) {
            doc += '<li>';
            doc += '   <img width="100px" src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">';
            doc += '   <p>' + doctor.doctor_name + '</p>';
            doc += '   <a href="#" json-data=' + encodeURIComponent(JSON.stringify(doctor)) + ' class="medkumo-sdk-book-an-appointment">Book An Appointment</a>';
            doc += '</li>';
        })

        // render
        Medkumo.jQuery("#medkumo-sdk-container").html('<ul class="medkumo-sdk-list-of-doctor"></ul>');
        Medkumo.jQuery('.medkumo-sdk-list-of-doctor').append(doc);

        Medkumo.jQuery(document).on("click", ".medkumo-sdk-book-an-appointment", function() {
            var doctor = JSON.parse(decodeURIComponent(Medkumo.jQuery(this).attr('json-data')));
            renderBookAnAppointment(doctor);
        });
    }

    function renderBookAnAppointment(doctor) {
        console.log('executing renderBookAnAppointment...');
        console.log(doctor.doctor_name);
        console.log(doctor.doctor_key);
        var tblForm = '';
        tblForm += '<table>';
        tblForm += '<tr>';
        tblForm += '<td>Patient Name</td>';
        tblForm += '<td><input type="text" name="patientName" value="' + doctor.doctor_name + '"/> </td>';
        tblForm += '</tr>';
        tblForm += '<tr>';
        tblForm += '<td>Patient Age</td>';
        tblForm += '<td><input type="text" name="patientAge"/> </td>'
        tblForm += '</tr>';
        tblForm += '<tr>';
        tblForm += '<td>Patient Mobile</td>';
        tblForm += '<td><input type="text" name="patientMobile"/> </td>';
        tblForm += '</tr>';
        tblForm += '<tr>';
        tblForm += '<td>Patient Mail</td>';
        tblForm += '<td><input type="text" name="patientMail"/> </td>';
        tblForm += '</tr>';
        tblForm += '<tr>';
        tblForm += '<td>Appointment Date & Time</td>';
        tblForm += '<td><input type="text" name="appointmentDateAndTime"/> </td>';
        tblForm += '</tr>';
        tblForm += '</table>';
        Medkumo.jQuery("#medkumo-sdk-container").html(tblForm);
    }

    function postAnAppointment(data) {
        console.log('executing postAnAppointment...');
        console.log(data);
    }

    function renderSuccess(data) {
        console.log('executing renderSuccess...');
        console.log(data);
    }

    function renderError(data) {
        console.log('executing renderError...');
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
