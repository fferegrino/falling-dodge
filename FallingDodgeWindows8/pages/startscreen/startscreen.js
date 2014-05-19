(function () {
    "use strict";

    var canvas, context, preload, stage, assets;
    //Buttons:
    var configI, configB, configH;
    var playI, playB, heartH;
    var infoI, infoB, infoHit;
    var medalI, medalB, medalH, medalHit;
    var backgroundI, backgroundB;
    // Measures
    var midWindowX, midWindowY;
    var padding;

    function onViewStateChanged(eventArgs) {
        if (window.innerWidth > 600) {
            midWindowX = window.innerWidth / 2;
            midWindowY = window.innerHeight / 2;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (assets) {
                backgroundB.x = (window.innerWidth / 2) - (backgroundB.image.width / 2);
                playB.x = midWindowX - playB.image.width / 2;
                infoB.x = window.innerWidth - padding - infoB.image.width;
            }
            canvas.style.display = "block";
            stage.update();
        } else {
            canvas.style.display = "none";
        }
    }


    WinJS.UI.Pages.define("/pages/startscreen/startscreen.html", {

        ready: function (element, options) {
            this.initialize(element);
        },
        initialize: function (element) {
            this.setMeasures();
            assets = false;
            window.addEventListener("resize", onViewStateChanged);
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            context = canvas.getContext("2d");
            stage = new createjs.Stage(canvas);

            preload = new createjs.LoadQueue(true);
            var manifest = [
                { id: "settings", src: "images/assets/buttons/settings.png" },
                { id: "play", src: "images/assets/buttons/play.png" },
                { id: "topscores", src: "images/assets/buttons/topscores.png" },
                { id: "info", src: "images/assets/buttons/info.png" },
                { id: "background", src: "images/assets/game/game-bg-1366x768.png" }
            ];
            preload.loadManifest(manifest);

            preload.on("complete", this.setGame, this);
        },

        setMeasures: function () {
            padding = 20;
            midWindowX = window.innerWidth / 2;
            midWindowY = window.innerHeight / 2;
        },

        setGame: function () {

            backgroundI = preload.getResult("background");
            backgroundB = new createjs.Bitmap(backgroundI);
            backgroundB.x = (window.innerWidth / 2) - (backgroundB.image.width / 2);
            backgroundB.y = (window.innerHeight / 2) - (backgroundB.image.height / 2);
            stage.addChild(backgroundB);

            configI = preload.getResult("settings");
            configB = new createjs.Bitmap(configI);
            configB.x = padding;
            configB.y = window.innerHeight - padding - configB.image.height;
            configB.addEventListener("click", this.configClick);
            stage.addChild(configB);

            playI = preload.getResult("play");
            playB = new createjs.Bitmap(playI);
            playB.x = midWindowX - playB.image.width / 2;
            playB.y = midWindowY - playB.image.height / 2;
            playB.addEventListener("click", this.playClick);
            stage.addChild(playB);

            infoI = preload.getResult("info");
            infoB = new createjs.Bitmap(infoI);
            infoB.x = window.innerWidth - padding - infoB.image.width;
            infoB.y = window.innerHeight - padding - configB.image.height;
            infoHit = new createjs.Shape();
            infoHit.graphics.beginFill("#000").drawRect(0, 0, infoB.image.width, infoB.image.height);
            infoB.hitArea = infoHit;
            stage.addChild(infoB);

            medalI = preload.getResult("topscores");
            medalB = new createjs.Bitmap(medalI);
            medalB.x = configB.x + configB.image.width + 2 * padding;
            medalB.y = window.innerHeight - padding - medalB.image.height;
            medalHit = new createjs.Shape();

            // Add hitarea property so clicking on transparent areas of png images trigger the event listeners associated to them
            medalHit.graphics.beginFill("#000").drawRect(0, 0, medalB.image.width, medalB.image.height); 
            medalB.hitArea = medalHit;
            medalB.addEventListener("click", this.medalClick);
            stage.addChild(medalB);
            stage.update();
            assets = true;
        },

        // Handlers
        medalClick: function () {
            WinJS.Navigation.navigate("/pages/topscores/topscores.html");
        },
        configClick: function () {
            WinJS.UI.SettingsFlyout.show();
        },
        playClick: function () {
            window.removeEventListener("resize", onViewStateChanged);
            WinJS.Navigation.navigate("/pages/game/game.html");
        }


    });
})();
