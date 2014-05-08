(function () {
    "use strict";

    var canvas, context, stage;
    var preload;
    var backgrundImage, backgroundBitmap;
    var viewStateEnabled = true;

    function showViewstateNotEnabled() {
        var msg = new Windows.UI.Popups.MessageDialog(
            "Falling Dodge no puede ser jugado en ese tamaño de pantalla");
        msg.showAsync();
    }



    function onViewStateChangedGame(eventArgs) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        backgroundBitmap.x = (window.innerWidth / 2) - (backgroundBitmap.image.width / 2);
        //backgroundBitmap.y = (window.innerHeight / 2) - (backgroundBitmap.image.height / 2) - 20;
        stage.update();
        /*
        if (window.innerWidth < 600)
            showViewstateNotEnabled();
        */
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
        setGame: function () {
            backgrundImage = preload.getResult("background");
            backgroundBitmap = new createjs.Bitmap(backgrundImage);
            backgroundBitmap.x = (window.innerWidth / 2) - (backgroundBitmap.image.width / 2);
            backgroundBitmap.y = (window.innerHeight / 2) - (backgroundBitmap.image.height / 2);
            stage.addChild(backgroundBitmap);

            var startText = new createjs.Text("aquí va el juego", "60px Segoe UI", "#0047B6");
            startText.y = backgroundBitmap.y + backgroundBitmap.image.height;
            startText.x = (window.innerWidth / 2) - (startText.getMeasuredWidth() / 2);
            stage.addChild(startText);

            stage.update();
        },
        bckClick: function () {
            window.removeEventListener("resize", onViewStateChangedGame);
            WinJS.Navigation.back();
        },
        initialize: function (element) {
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            window.addEventListener("resize", onViewStateChangedGame);


            // AppBar

            var appbarCtrl = document.getElementById('appbar');
            document.getElementById('bck').addEventListener("click", this.bckClick, false);

            context = canvas.getContext("2d");

            preload = new createjs.LoadQueue(true);
            var manifest = [
                { id: "background", src: "images/assets/game/game-bg-1366x768.png" }
            ];
            preload.loadManifest(manifest);
            preload.on("complete", this.setGame, this);
            stage = new createjs.Stage(canvas);
        }


    });
})();
