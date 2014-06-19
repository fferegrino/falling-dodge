(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("/settings/privacy.html", {
        ready: function (element, options) {
            loadResources();
            WinJS.Resources.addEventListener("contextchanged", loadResources);
        }
    });
    function loadResources() {
        WinJS.Resources.processAll();
    }
})();