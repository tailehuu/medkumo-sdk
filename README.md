You must insert the source code below at the bottom of the body tag to render the Medkudo Book An Appointment.
```html
<script>
	(function(){
		var script = document.createElement('script');
		script.async = true;
		script.src = 'http://sdk.medkumo.loc:85/medkumo.js';
		var entry = document.getElementsByTagName('script')[0];
		entry.parentNode.insertBefore(script, entry);
	})();
	window.Medkumo_ready=function(){
		Medkumo.initial('hospital_key');
		console.log("Nghia");
	};	
</script>
```

## Note
- script.src: is the source file public of medkumo.js, ex: http://sdk.medkumo.loc:85/medkumo.js
