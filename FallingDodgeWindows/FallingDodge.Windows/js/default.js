
(function () {
    "use strict";
    var app = WinJS.Application;

    /* When the app is resized this function will be triggered */

    jQuery(window).resize(function () {

    });

    // Start routine
    jQuery(document).ready(function () {

        // Indicate Windows 8 platform
        window["c2isWindows8"] = true;

        // Create new runtime using the c2canvas
        cr_createRuntime("c2canvas");

        cr_sizeCanvas(jQuery(window).width(), jQuery(window).height());
        app.start();
        WinJS.Resources.processAll();
    });

    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {

            }
            else {
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
        // History flyout:
        cmds["history"] = { title: WinJS["Resources"].getString("appName").value, href: "/settings/history.html" };
        // Controls flyout:
        cmds["controls"] = { title: WinJS["Resources"].getString("controls").value, href: "/settings/controls.html" };
        // Settings flyout:
        cmds["privacy"] = { title: WinJS["Resources"].getString("privacy").value, href: "/settings/privacy.html" };
        // Special thanks flyout:
        cmds["thanks"] = { title: WinJS["Resources"].getString("acknowledgments").value, href: "/settings/thanks.html" };

        e.detail.applicationcommands = cmds;
        WinJS.UI.SettingsFlyout.populateSettings(e);
    });


    Windows.UI.WebUI.WebUIApplication.addEventListener("resuming", function () {
        cr_setSuspended(false);
    }, false);

    // Center an element on the screen
    jQuery.fn.centerVertical = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                    $(window).scrollTop()) + "px");
        return this;
    }

})();