/**
 * @author Julian Uran
 * @description Extends LabelMe for having a way to update the status of an image after labeling.
 * Expected file location: LabelMeAnnotationTool/annotationTools/js/labelme_navigator.js
 **/
// var serverUrl = 'http://julian-b450-i-aorus-pro-wifi.wifi.cmu.edu:8000/';
var serverUrl = 'http://vm041.bridges.psc.edu:8000/';
// var serverUrl = 'http://127.0.0.1:8000/';

var app = new Vue({
    el: '#labelme_navigator_app',
    data: {
        image_name: "",
        human_labeled_stamps: false,
        human_labeled_pages: false,
        human_labeled_stamps_status: "-",
        human_labeled_pages_status: "-"
    },
    methods: {
        getStatuses: function () {
            axios.get(serverUrl + "get-status/" + this.image_name)
                .then(function (response) {
                    if (response.data.human_labeled_stamps) {
                        this.human_labeled_stamps = true;
                        this.human_labeled_stamps_status = "Complete";
                        $(".human_labeled_stamps_status").text("Done!");
                        $('#button-setStampsCompletedStatus').attr('disabled','disabled');
                    } else {
                        this.human_labeled_stamps = false;
                        this.human_labeled_stamps_status = "Incomplete";
                        $(".human_labeled_stamps_status").text("Incomplete");
                        $('#button-setStampsCompletedStatus').removeAttr('disabled');
                    }

                    if (response.data.human_labeled_pages) {
                        this.human_labeled_pages = true;
                        this.human_labeled_pages_status = "Complete";
                        $(".human_labeled_pages_status").text("Done!");
                        $('#button-setPagesCompletedStatus').attr('disabled','disabled');
                    } else {
                        this.human_labeled_pages = false;
                        this.human_labeled_pages_status = "Incomplete";
                        $(".human_labeled_pages_status").text("Incomplete");
                        $('#button-setPagesCompletedStatus').removeAttr('disabled');
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
            axios({
                method: 'post',
                url: serverUrl + "set-status",
                data: {
                    stamp: true,
                    page: false,
                    image_name: this.image_name
                },
            })
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("200 OK - Status sent to server.");
                        app.getStatuses();
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
            axios.post(serverUrl + "set-status", {stamp: false, page: true, image_name: this.image_name})
                .then(function (response) {
                    if (response.status === 200) {
                        console.log("200 OK - Status sent to server.");
                        app.getStatuses();
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