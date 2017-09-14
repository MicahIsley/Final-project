/*if (navigator.geolocation) {
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
}*/

// Capture the form inputs 
var sAnimals = {
    bear: ["bear", 4, 1, 4, 2, 3, 4, 5, 4, 1, 1],
    cat: ["cat", 3, 2, 2, 5, 4, 5, 4, 1, 3, 2],
    dog: ["dog", 3, 5, 3, 3, 3, 4, 2, 4, 5, 5],
    dragon: ["dragon", 5, 1, 5, 5, 5, 2, 5, 1, 3, 1],
    dino: ["dino", 4, 2, 5, 5, 5, 4, 4, 1, 2, 1],
    monkey: ["monkey", 2, 5, 3, 1, 2, 5, 2, 3, 5, 5],
    seal: ["seal", 1, 4, 4, 2, 1, 3, 1, 5, 4, 4]
};

var spiritAnimalList = [sAnimals.bear, sAnimals.cat, sAnimals.dog, sAnimals.dragon, sAnimals.dino, sAnimals.monkey, sAnimals.seal];
var userResponseData = [];
var addedDiff = 0;
var userDiffs = 40;
var closestMatch;
var currentUsername;
var currentUserId;

function getUserData() {
    $.ajax('/user', {
        credentials: "include",
    })
    .then((res) => {
        currentUserId = res.user;
        getCurrentUsername();
        this.isAuthenticated = true
        if (typeof cb === 'function') {
            cb(res.json().user);
        }
    });
};

function getCurrentUsername(){
    console.log(currentUserId);
    $.get("/api/userinfo/" + currentUserId, function(data){
        console.log(data.username);
        currentUsername = data.username;
    });
};

function createFood(){
    $.post("/api/newitems/" + currentUsername, function(data){
        console.log(data);
    });
};

getUserData();

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
            username: currentUsername,
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
        currentUsername = userData.username;
        // AJAX post the data to the friends API. 
        $.post("/api/survey", userData)
        .done(function(data) {
            fillUserArray(data);
        });
    } else {
        alert("Please fill out all fields before submitting!");
    }
    return false;
});

function fillUserArray(data){
    userResponseData.push(parseInt(data.q1));
    userResponseData.push(parseInt(data.q2));
    userResponseData.push(parseInt(data.q3));
    userResponseData.push(parseInt(data.q4));
    userResponseData.push(parseInt(data.q5));
    userResponseData.push(parseInt(data.q6));
    userResponseData.push(parseInt(data.q7));
    userResponseData.push(parseInt(data.q8));
    userResponseData.push(parseInt(data.q9));
    userResponseData.push(parseInt(data.q10));
    assignSpiritAnimal();
}
function assignSpiritAnimal(){
    for(i=0; i<spiritAnimalList.length; i++){
        var currentAnimal = spiritAnimalList[i];
        console.log(currentAnimal);
        for(j=1; j<11; j++){
            var difference = Math.abs(currentAnimal[j] - userResponseData[j-1]);
            addedDiff += difference;
            if(j === 10){
                if(addedDiff <= userDiffs){
                    userDiffs = addedDiff;
                    closestMatch = currentAnimal[0];
                    console.log(userDiffs);
                }else{console.log(addedDiff);}
                addedDiff = 0;
            }else{}
        }
    }
    console.log(userDiffs);
    console.log(closestMatch);
    updateAnimalDatabase();
}

function updateAnimalDatabase(){
    var assignedSpiritAnim = {
        username: currentUsername,
        animal: closestMatch,
        id: currentUserId};
    $.ajax({
        method: "PUT",
        url: "/api/assignSpiritAnimal",
        data: assignedSpiritAnim
    })
    .done(function() {
        console.log("something");
        $("#meetYourSpiritAnimal").show();
        $("#survey").hide();
        createFood();
    });
}
