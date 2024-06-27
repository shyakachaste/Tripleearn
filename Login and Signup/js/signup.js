
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "auto",
    geoIpLookup: function(success, failure) {
        fetch('https://ipinfo.io', {
            mode: 'no-cors' })
            .then(function(resp) {
                let countryCode = (resp && resp.country) ? resp.country : "us";
                success(countryCode);
            })
            .catch(function() {
                success("us");
            });
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});


const countryDropdown = document.getElementById("country");
const countryData = window.intlTelInputGlobals.getCountryData();
countryData.forEach(function(country) {
    const option = document.createElement("option");
    option.value = country.iso2;
    option.text = country.name;
    countryDropdown.add(option);
});

countryDropdown.addEventListener("change", function() {
    phoneInput.setCountry(this.value);
});
