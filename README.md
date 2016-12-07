You must insert the source code below at the bottom of the body tag to render the Medkudo Book An Appointment.

```html
<script src='//sdk.medkumo.loc:85/medkumo.js'></script>
```
After that you can be bind click event to the function.
Example:
```html
<button onclick="Medkumo.showBookAnAppointment('<hospital_key>', '<doctor_key>')">Booking</button>
```
# Note

- src: is the source file public of medkumo.js, ex: <http://sdk.medkumo.loc:85/medkumo.js>
