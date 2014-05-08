(function () {
    "use strict";

    var canvas, context, stage;
    var preload;
    var escomImage, escomBitmap;

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            this.initialize(element);
        },

        
        touchHandler: function (event) {

            WinJS.Navigation.navigate("/pages/startscreen/startscreen.html");
        },

        setGame: function () {
            escomImage = preload.getResult("escom");
            escomBitmap = new createjs.Bitmap(escomImage);
            escomBitmap.x = (window.innerWidth / 2) - (escomBitmap.image.width / 2);
            escomBitmap.y = (window.innerHeight / 2) - (escomBitmap.image.height / 2) - 20;
            stage.addChild(escomBitmap);

            var startText = new createjs.Text("presiona para continuar", "60px meriendaOne", "#fff");
            startText.y = escomBitmap.y + escomBitmap.image.height;
            startText.x = (window.innerWidth / 2) - (startText.getMeasuredWidth() / 2);
            stage.addChild(startText);


            stage.update();
        },
        initialize: function (element) {
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            //Handle Touch
            canvas.addEventListener("MSPointerUp", this.touchHandler, false);

            context = canvas.getContext("2d");

            preload = new createjs.LoadQueue(true);
            var manifest = [
                { id: "escom", src: "images/assets/escom-light.png" }
            ];
            preload.loadManifest(manifest);
            preload.on("complete", this.setGame, this);
            stage = new createjs.Stage(canvas);
        }


    });
})();
