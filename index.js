const { Plugin } = require("powercord/entities");
const { inject, uninject } = require("powercord/injector");
const { getModule } = require("powercord/webpack");

function playSound(url, volume) {
    const audio = new Audio();
    audio.src = url;
    if (volume) audio.volume = volume;
    audio.play();
}

class DootDootPlugin extends Plugin {
    async startPlugin() {
        const SoundPlayer = await getModule([ "playSound" ]);

        inject("tp-playSound", SoundPlayer, "playSound", (e) => {
            if (e[0] === "message1") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/dootdoot.ogg", e[1]);
                return false;
            }

            return e;
        }, true);
    }

    pluginWillUnload() {
        uninject("tp-playSound");
    }
}

module.exports = DootDootPlugin;
