(function () {
    "use strict";

    var canvas, context, stage;
    var preload;
    var frameRate = 60;
    var timeOut;
    var animFrame = window.requestAnimationFrame;
    // Stage related vars
    var backgroundImage, backgroundBitmap;
    var pauseI, pauseB, pauseHit;
    var pauseFade, pauseText;
    var textoPuntuacion;
    var mainCharacter;

    function tick(event) {
        if (!paused) {
            stage.update(event);
        }
    }
    createjs.Ticker.setInterval(25);
    createjs.Ticker.setFPS(24);

    // Game related vars:
    var paused;
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

    function checkValidWidth() {

    }


    function onViewStateChangedGame(eventArgs) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        backgroundBitmap.x = (window.innerWidth / 2) - (backgroundBitmap.image.width / 2);
        stage.update();
    }

    WinJS.UI.Pages.define("/pages/game/game.html", {
        ready: function (element, options) {
            this.initialize(element);
        },
        
        initialize: function (element) {
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            context = canvas.getContext("2d");
            stage = new createjs.Stage(canvas);

            preload = new createjs.LoadQueue(true);
            var manifest = [
                { id: "background", src: "images/assets/game/game-bg-1366x768.png" },
                { id: "pause", src: "images/assets/buttons/pause.png" },
                { id: "mainCharacter", src: "images/assets/game/characters/mainC.png" }
            ];
            preload.loadManifest(manifest);

            // Event listeners:
            preload.on("complete", this.setGame, this);
            window.addEventListener("resize", onViewStateChangedGame);
            document.getElementById('bck').addEventListener("click", this.bckClick, false);

        },

        getAnimationElements: function(){
            return undefined;
        },
        setGame: function () {
            backgroundImage = preload.getResult("background");
            backgroundBitmap = new createjs.Bitmap(backgroundImage);
            backgroundBitmap.x = (window.innerWidth / 2) - (backgroundBitmap.image.width / 2);
            backgroundBitmap.y = (window.innerHeight / 2) - (backgroundBitmap.image.height / 2);
            stage.addChild(backgroundBitmap);

            pauseFade = new createjs.Shape();
            pauseFade.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0, 0, window.innerWidth, window.innerHeight);
            pauseFade.visible = false;
            stage.addChild(pauseFade);

            pauseI = preload.getResult("pause");
            pauseB = new createjs.Bitmap(pauseI);
            pauseHit = new createjs.Shape();
            pauseHit.graphics.beginFill("#000").drawRect(0, 0, pauseB.image.width, pauseB.image.height);
            pauseB.x = 20;
            pauseB.y = 20;
            pauseB.hitArea = pauseHit;
            pauseB.addEventListener("click", this.pauseClick);
            stage.addChild(pauseB);

            textoPuntuacion = new createjs.Text(user + ": " + totalPoints, "40px meriendaOne", "#fff");
            textoPuntuacion.y = 20;
            textoPuntuacion.x = 20 + pauseB.image.width + 20;
            stage.addChild(textoPuntuacion);

            var dataSpriteC = {
                images: [preload.getResult("mainCharacter")],
                frames: { width: 96, height: 127 },
                animations: { walk: [0, 2] },
                framerate: 7
            };
            var spriteSheet = new createjs.SpriteSheet(dataSpriteC);
            mainCharacter = new createjs.Sprite(spriteSheet, "walk");
            mainCharacter.y = window.innerHeight - 127;
            mainCharacter.x = window.innerWidth - 48;
            stage.addChild(mainCharacter);

            registerForShareGame();
            paused = false;

            //stage.update();
            //timeOut = windwsetInterval(gameLoop, 35);
            //animFrame(gameLoop);
            //
            createjs.Ticker.addEventListener("tick", tick);
        },

        // Handlers:
        pauseClick: function () {
            if (paused) {
                pauseFade.visible = false;
            } else {
                pauseFade.visible = true;
            }
            paused = !paused;
        },
        bckClick: function () {
            window.removeEventListener("resize", onViewStateChangedGame);
            WinJS.Navigation.back();
        }


    });
})();
