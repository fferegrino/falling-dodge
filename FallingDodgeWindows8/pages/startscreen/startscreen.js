(function () {
    "use strict";

    var canvas, context, preload, stage;
    //Buttons:
    var configI, configB, configH;
    var playI, playB, heartH;
    var medalI, medalB, medalH;
    // Measures
    var midWindowX, midWindowY;
    var padding;

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
            stage.addChild(playB);

            medalI = preload.getResult("topscores");
            medalB = new createjs.Bitmap(medalI);
            medalB.x = configB.x + configB.image.width + 2 * padding;
            medalB.y = window.innerHeight - padding - medalB.image.height;
            medalH = new createjs.ButtonHelper(medalB);
            medalB.addEventListener("click",this.medalClick);
            stage.addChild(medalB);

            stage.update();
        },
        medalClick: function () {
            WinJS.Navigation.navigate("/pages/topscores/topscores.html");
        },
        configClick : function(){
            WinJS.UI.SettingsFlyout.show();
        },
        initialize: function (element) {
            this.setMeasures();
            canvas = element.querySelector("#gameCanvas");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            context = canvas.getContext("2d");

            preload = new createjs.LoadQueue(true);
            var manifest = [
                { id: "settings", src: "images/assets/buttons/settings.png" },
                { id: "play", src: "images/assets/buttons/play.png" },
                { id: "topscores", src: "images/assets/buttons/topscores.png" }
            ];
            preload.loadManifest(manifest);
            preload.on("complete",this.setGame, this);
            stage = new createjs.Stage(canvas);
        }


    });
})();
