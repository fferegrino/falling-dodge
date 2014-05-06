(function () {
    "use strict";

    var topListView;
    var data = new WinJS.Binding.List([
                { id: 1, puntos: 13120, nombre: "Usuario 1" },
                { id: 2, puntos: 12341, nombre: "Usuario 1" },
                { id: 3, puntos: 12000, nombre: "Usuario 2" },
                { id: 4, puntos: 11000, nombre: "Usuario 4" }
    ]);

    WinJS.UI.Pages.define("/pages/topscores/topscores.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            this.initialize(element);
        },

        setGame: function () {

        },

        initialize: function (element) {
            topListView = element.querySelector("#topListView").winControl;
            topListView.itemDataSource = data.dataSource;
            topListView.itemTemplate = element.querySelector(".itemtemplate");
        }


    });
})();
