(function () {
    "use strict";

    var canvas, context, preload, stage;
    //Buttons:
    var configI, configB, configH;
    var playI, playB, heartH;
    var infoI, infoB;
    var medalI, medalB, medalH;
    var backgroundI, backgroundB;
    // Measures
    var midWindowX, midWindowY;
    var padding;

    function onViewStateChanged(eventArgs) {
        midWindowX = window.innerWidth / 2;
        midWindowY = window.innerHeight / 2;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        if (playB != undefined) {
            playB.x = midWindowX - playB.image.width / 2;
            //playB.y = midWindowY - playB.image.height / 2;
        }
        if (infoI != undefined) {
            infoB.x = window.innerWidth - padding - infoB.image.width;
        }
        stage.update();
    }


    WinJS.UI.Pages.define("/pages/startscreen/startscreen.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            this.initialize(element);
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
            stage.addChild(infoB);

            medalI = preload.getResult("topscores");
            medalB = new createjs.Bitmap(medalI);
            medalB.x = configB.x + configB.image.width + 2 * padding;
            medalB.y = window.innerHeight - padding - medalB.image.height;
            medalH = new createjs.ButtonHelper(medalB);
            medalB.addEventListener("click", this.medalClick);
            stage.addChild(medalB);

            stage.update();
        },
        medalClick: function () {
            WinJS.Navigation.navigate("/pages/topscores/topscores.html");
        },
        configClick: function () {
            WinJS.UI.SettingsFlyout.show();
        },
        playClick: function () {
            window.removeEventListener("resize", onViewStateChanged);
            WinJS.Navigation.navigate("/pages/game/game.html");
        },
        initialize: function (element) {
            this.setMeasures();
            window.addEventListener("resize", onViewStateChanged);
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            context = canvas.getContext("2d");

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
            stage = new createjs.Stage(canvas);
        }


    });
})();
