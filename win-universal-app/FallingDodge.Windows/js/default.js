
(function () {
    "use strict";
    var app = WinJS.Application;
    var originalH, originalW;
    jQuery(window).resize(function () {
        if (jQuery(window).width() == originalW) {
            cr_setSuspended(false);
        } else {
            cr_setSuspended(true);
        }
        //cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
    });

    // Start the Construct 2 project running on window load.
    jQuery(document).ready(function () {

        // Indicate Windows 8 platform
        window["c2isWindows8"] = true;

        // Create new runtime using the c2canvas
        cr_createRuntime("c2canvas");

        cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());

        app.start();
    });

    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            originalW = jQuery(window).width();
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched.
            }
            else {
                // This application has been reactivated from suspension.
                cr_setSuspended(false);
            }

            args.setPromise(WinJS.UI.processAll());

        }
    };

    app.oncheckpoint = function (args) {
        // This application is about to be suspended.
        cr_setSuspended(true);
    };


    // Populate settings charm:
    WinJS["Application"].addEventListener("settings", function (e) {
        var cmds = {};
        // Settings flyout:
        cmds["about"] = { title: "Acerca de", href: "/settings/about.html" };
        // History flyout:
        cmds["history"] = { title: "Historia", href: "/settings/history.html" };

        e.detail.applicationcommands = cmds;
        WinJS.UI.SettingsFlyout.populateSettings(e);
    });


    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", function () {
        cr_setSuspended(false);
    }, false);

})();