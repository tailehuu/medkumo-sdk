You must insert the source code below at the bottom of the body tag to render the Medkudo Book An Appointment.

```html
<script>
  (function() {
    var script, entry;
    script = document.createElement('script');
    script.async = true;
    script.src =  '//sdk.medkumo.loc:' + window.location.port + '/medkumo.js';
    entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(script, entry);
  })();
  window.Medkumo_ready = function() {
    Medkumo.init('<your hospital key>');
  };
</script>
```

# Note

- script.src: is the source file public of medkumo.js, ex: <http://sdk.medkumo.loc:85/medkumo.js>
