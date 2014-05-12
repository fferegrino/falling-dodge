(function () {
    "use strict";

    var canvas, context, stage;
    var preload;
    // Stage related vars
    var backgroundImage, backgroundBitmap;
    var pauseI, pauseB;
    var textoPuntuacion;

    // Game related vars:
    var viewStateEnabled = true;
    var totalPoints = 999999;
    var user = "create_js"

    function showViewstateNotEnabled() {
        var msg = new Windows.UI.Popups.MessageDialog(
            "Falling Dodge no puede ser jugado en ese tamaño de pantalla");
        msg.showAsync();
    }

    function registerForShareGame() {
        var dataTransferManager = Windows.ApplicationModel.DataTransfer.DataTransferManager.getForCurrentView();
        dataTransferManager.addEventListener("datarequested", shareHandler);
    }

    function shareHandler(e) {
        var request = e.request;
        request.data.properties.title = "Puntuación";
        request.data.properties.description = "Comparte tu puntuación"
        request.data.setText("He juntado " + totalPoints + " en Falling Dodge. Ven a vencerme: http://www.fallingdodge.com");

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

        getAnimationElements: function(){
            return undefined;
        },
        touchHandler: function (event) {
            WinJS.Navigation.navigate("/pages/startscreen/startscreen.html");
        },
        setGame: function () {
            backgroundImage = preload.getResult("background");
            backgroundBitmap = new createjs.Bitmap(backgroundImage);
            backgroundBitmap.x = (window.innerWidth / 2) - (backgroundBitmap.image.width / 2);
            backgroundBitmap.y = (window.innerHeight / 2) - (backgroundBitmap.image.height / 2);
            stage.addChild(backgroundBitmap);

            pauseI = preload.getResult("pause");
            pauseB = new createjs.Bitmap(pauseI);
            pauseB.x = 20;
            pauseB.y = 20;
            stage.addChild(pauseB);

            textoPuntuacion = new createjs.Text(user + ": " + totalPoints, "40px meriendaOne", "#fff");
            textoPuntuacion.y = 20;
            textoPuntuacion.x = 20 + pauseB.image.width + 20;
            stage.addChild(textoPuntuacion);

            registerForShareGame();

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
                { id: "background", src: "images/assets/game/game-bg-1366x768.png" },
                { id: "pause", src: "images/assets/buttons/pause.png" }
            ];
            preload.loadManifest(manifest);
            preload.on("complete", this.setGame, this);
            stage = new createjs.Stage(canvas);
        }


    });
})();
