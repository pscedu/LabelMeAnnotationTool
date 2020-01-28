/**
 * @author Julian Uran
 * @description Extends LabelMe for having a way to update the status of an image after labeling.
 * Expected file location: LabelMeAnnotationTool/annotationTools/js/labelme_navigator.js
 **/
var app = new Vue({
    el: '#labelme_navigator_app',
    data: {
        image_name: "",
        message: "hello world",
        human_labeled_stamps: false,
        human_labeled_pages: false,
        human_labeled_stamps_status: "INCOMPLETE",
        human_labeled_pages_status: "INCOMPLETE"
    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        },
        getStatuses: function () {
            axios.get('/get-statuses?image_name=' + this.image_name)
                .then(function (response) {
                    if (response.data.human_labeled_stamps_status === true) {
                        this.human_labeled_stamps = true;
                        $(".human_labeled_stamps_status").text("Done!");
                    }

                    if (response.data.human_labeled_pages_status === true) {
                        this.human_labeled_pages = true;
                        $(".human_labeled_pages_status").text("Done!");
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
