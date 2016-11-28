(function(window, undefined) {
    var Medkumo = {};
    if (window.Medkumo) {
        return;
    }
    const PROTOCOL = window.location.protocol;
    const PORT = window.location.port;
    const SDK_DOMAIN = 'sdk.medkumo.loc';
    const API_DOMAIN = 'api.medkumo.loc';
    const DOCTORLIST_URI = PROTOCOL + '//' + API_DOMAIN + ':' + PORT + '/index.php?name=list_doctor';
    const FORM_HTML_DOCTORS = '<ul class="BaP_Doctors">' +
        '<a href="#" id="BaP_Doctors_BtnClose">X</a>' +
        '</ul>';

    Medkumo.initialize = function(hospital_key) {
        loadStylesheet(PROTOCOL + '//' + SDK_DOMAIN + ':' + PORT + '/medkumo.css');
        loadScript(PROTOCOL + '//' + SDK_DOMAIN + ':' + PORT + '/lib/jquery-medkumo.js', initializeWidget.bind(hospital_key));
    };

    var initializeWidget = function initializeWidget() {
        var Medkumo_PnlBookAnAppointment = document.createElement('div');
        Medkumo_PnlBookAnAppointment.setAttribute("id", "Medkumo_PnlBookAnAppointment");
        document.body.appendChild(Medkumo_PnlBookAnAppointment);
        getListOfDoctor(this.toString());
    }

    function checkHospitalKey(hospital_key) {
        return true;
    }

    function getListOfDoctor(hospital_key) {
        if (checkHospitalKey(hospital_key)) {
            Medkumo.jQuery("#Medkumo_PnlBookAnAppointment").html(FORM_HTML_DOCTORS);
            Medkumo.jQuery.getJSON(DOCTORLIST_URI, function(doctors) {
                renderListOfDoctor(doctors)
            });
        }
    }

    function renderListOfDoctor(doctors) {
        doctors.map(function(item, index) {
            var doc = '<li class="BaP_Doctor_Item">' +
                '<img width="100px" src="http://0.soompi.io/wp-content/uploads/2016/05/27215011/YG-.jpg">' +
                '<p class="BaP_Doctor_Item_Name">' + item.doctor_name + '</p>' +
                '<a href="#" json-data='+encodeURIComponent(JSON.stringify(item))+'  class="BaP_Doctor_Item_BtnBook btn_Style">Book An Appointment</a>' +
                '</li>';
            Medkumo.jQuery('.BaP_Doctors').append(doc);
        })
        Medkumo.jQuery(document).on("click", ".BaP_Doctor_Item_BtnBook", function() {
          var doctor_name='Dr Sahesh';
          var doctor=JSON.parse(decodeURIComponent(Medkumo.jQuery(this).attr('json-data')));
          renderBookAnAppointment(doctor);
        });
    }

    function renderBookAnAppointment({doctor_name,doctor_key}) {
      console.log(doctor_name);
      console.log(doctor_key);
    }

    function postAnAppointment(data) {}

    function renderSuccess(data) {}

    function renderError(data) {}

    function loadScript(src, callback) {
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
