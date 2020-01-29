/**
 * @author Julian Uran
 * @description Extends LabelMe for having a way to update the status of an image after labeling.
 * Expected file location: LabelMeAnnotationTool/annotationTools/js/labelme_navigator.js
 **/
var serverUrl = 'http://julian-b450-i-aorus-pro-wifi.wifi.cmu.edu:8000/';
var app = new Vue({
    el: '#labelme_navigator_app',
    data: {
        image_name: "",
        human_labeled_stamps: false,
        human_labeled_pages: false,
        human_labeled_stamps_status: "INCOMPLETE",
        human_labeled_pages_status: "INCOMPLETE"
    },
    methods: {
        getStatuses: function () {
            axios.get( serverUrl + "status/" + this.image_name)
                .then(function (response) {
                    if (response.data.human_labeled_stamps) {
                        this.human_labeled_stamps = true;
                        $(".human_labeled_stamps_status").text("Done!");
                    } else {
                        console.log("human_labeled_stamps false");
                    }

                    if (response.data.human_labeled_pages) {
                        this.human_labeled_pages = true;
                        $(".human_labeled_pages_status").text("Done!");
                    }
                     else {
                        console.log("human_labeled_pages_status false");
                    }
                })
                .catch(function (error) {
                    console.log("Error");
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        setStampsCompletedStatus: function () {
            axios.post( serverUrl + "status", { stamp: true, page: false, image_name: this.image_name })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("200 OK - Status sent to server.");
                    } else {
                        console.alert("Error sending status sent to server.");
                    }
                })
                .catch(function (error) {
                    console.log("Error");
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
        setPagesCompletedStatus: function () {
            axios.post( serverUrl + "status", { stamp: false, page: true, image_name: this.image_name })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("200 OK - Status sent to server.");
                    } else {
                        console.alert("Error sending status sent to server.");
                    }
                })
                .catch(function (error) {
                    console.log("Error");
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        },
    }
});
