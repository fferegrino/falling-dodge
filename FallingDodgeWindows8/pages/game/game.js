(function () {
    "use strict";

    var canvas, context, stage;
    var preload;
    var escomImage, escomBitmap;
    var viewStateEnabled = true;
    
    function showViewstateNotEnabled() {
        var msg = new Windows.UI.Popups.MessageDialog(
            "No internet connection has been found.");
        msg.showAsync();
    }

    WinJS.UI.Pages.define("/pages/game/game.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            this.initialize(element);
        },

        
        touchHandler: function (event) {
            WinJS.Navigation.navigate("/pages/startscreen/startscreen.html");
        },
        
        onViewStateChange: function (eventArgs) {
            showViewstateNotEnabled();
        },
        setGame: function () {
            escomImage = preload.getResult("escom");
            escomBitmap = new createjs.Bitmap(escomImage);
            escomBitmap.x = (window.innerWidth / 2) - (escomBitmap.image.width / 2);
            escomBitmap.y = (window.innerHeight / 2) - (escomBitmap.image.height / 2) - 20;
            stage.addChild(escomBitmap);

            var startText = new createjs.Text("aquí va el juego", "60px Segoe UI", "#0047B6");
            startText.y = escomBitmap.y + escomBitmap.image.height;
            startText.x = (window.innerWidth / 2) - (startText.getMeasuredWidth() / 2);
            stage.addChild(startText);

            stage.update();
        },
        bckClick: function(){
            WinJS.Navigation.back();
        },
        initialize: function (element) {
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            window.addEventListener("resize", this.onViewStateChanged);

            // AppBar
            
            var appbarCtrl = document.getElementById('appbar');
            document.getElementById('bck').addEventListener("click", this.bckClick, false);

            context = canvas.getContext("2d");

            preload = new createjs.LoadQueue(true);
            var manifest = [
                { id: "escom", src: "images/assets/escom.png" }
            ];
            preload.loadManifest(manifest);
            preload.on("complete", this.setGame, this);
            stage = new createjs.Stage(canvas);
        }


    });
})();
