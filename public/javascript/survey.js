if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var geocoder = new google.maps.Geocoder;
        var point = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        geocoder.geocode({
            'latLng': point
        }, function(locations, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                for (var location of locations) {
                    if ($.inArray('locality', location.types) != -1) {
                        $('#location').val(location.formatted_address);
                        break;
                    }
                };
            }
        });
    });
}
// Capture the form inputs 
$("#submit").on("click", function() {
    // Form validation
    function validateForm() {
        var isValid = true;
        $('.form-control').each(function() {
            if ($(this).val() === '')
                isValid = false;
        });
        $('.select').each(function() {
            if ($(this).val() === null)
                isValid = false
        })
        return isValid;
    }
    // If all required fields are filled
    if (validateForm() == true) {
        // Create scores array
       
        // Create an object for the user's data
        var userData = {
            username: "test",
            q1: $("#q1").val(),
            q2: $("#q2").val(),
            q3: $("#q3").val(),
            q4: $("#q4").val(),
            q5: $("#q5").val(),
            q6: $("#q6").val(),
            q7: $("#q7").val(),
            q8: $("#q8").val(),
            q9: $("#q9").val(),
            q10: $("#q10").val()
        }
        // AJAX post the data to the friends API. 
        $.post("/api/survey", userData)
        .done(function(data) {
            
        });
    } else {
        alert("Please fill out all fields before submitting!");
    }
    return false;
});