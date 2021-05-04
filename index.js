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
        const SoundPlayer = await getModule(["playSound"]);

        inject("tp-playSound", SoundPlayer, "playSound", (e) => {
            console.log(e[0]);
            if (e[0] === "message1") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/dootdoot.ogg", e[1]);
                return false;
            } else if (e[0] === "unmute") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/mute1.ogg", e[1]);
                return false;
            } else if (e[0] === "mute") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/mute2.ogg", e[1]);
                return false;
            } else if (e[0] === "undeafen") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/deafen1.ogg", e[1]);
                return false;
            } else if (e[0] === "deafen") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/deafen2.ogg", e[1]);
                return false;
            } else if (e[0] === "user_join") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/baba.ogg", e[1]);
                return false;
            } else if (e[0] === "user_leave") {
                playSound("https://raw.githubusercontent.com/DigitalJokerMan/pc-dootdoot/master/booey.ogg", e[1]);
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
