(function () {
    "use strict";
    var app = WinJS.Application;
    var wHeight, wWidth;
    jQuery(window).resize(function () {
        cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
    });

    // Start the Construct 2 project running on window load.
    jQuery(document).ready(function () {
        // Indicate Windows Phone 8.1 platform
        window["c2isWindowsPhone81"] = true;

        // Create new runtime using the c2canvas
        cr_createRuntime("c2canvas");
        wHeight = jQuery(window).height();
        wWidth = wHeight * 1.7777777778;
        

        cr_sizeCanvas(wWidth, wHeight);
        jQuery("#c2canvas").css({
            height: wHeight + "px",
            width: wWidth + "px"

        });
        app.start();
    });

    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched.
            }
            else {
                // This application has been reactivated from suspension.
                cr_setSuspended(false);
            }
            args.setPromise(WinJS.UI.processAll());
        }8
    };

    app.oncheckpoint = function (args) {
        // This application is about to be suspended.
        cr_setSuspended(true);
    };

    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", function () {
        cr_setSuspended(false);
    }, false);

})();