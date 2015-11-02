// Stay alive for two minutes.
// If you win, it gets harder (and more rewarding).
// If you lose, you must wait a day before you can resubmit.
// Remember, each submission gets a new random seed.
var activeTrap = false;
var traps = [
    [44, 77], [44, 73], /* [44, 70], [44, 67], */ [44, 64]
];
var trapIndex = 0;
var xoffset = 0;
var activeTraps = 0;
var lastHealth = this.health;
var isRetreated = false;
var safeCorridor = 67;

this.detect = function() {
    var result = {};
    result.enemy = this.findNearestEnemy();
    if (result.enemy) {
        result.dist = this.distanceTo(result.enemy);
        result.isclose = result.dist < 10;
    } else {
        result.isclose = false;
    }
    result.cleave = this.isReady("cleave");
    result.electrocute = this.isReady("electrocute");
    result.damage = lastHealth - this.health;
    lastHealth = this.health;

    return result;
};



this.trap = function() {
    this.say("trap");
    var t = traps[trapIndex++];
    if (trapIndex >= traps.length) {
        trapIndex = 0;
        xoffset += 4;
    }
    this.moveXY(t[0] + xoffset + 5, t[1]);
    this.buildXY("bear-trap", t[0] + xoffset, t[1]);
    activeTraps++;
};

this.retreat = function() {

    var x = this.pos.x;
    var y = this.pos.y;
    //this.say("retreat" + x + ", " + y);

    var ydelta = safeCorridor - this.pos.y;
    if (ydelta > 5) ydelta = 5;
    if (ydelta < -5) ydelta = -5;
    y += ydelta;
    isRetreated = false;
    if (ydelta > 2 || ydelta < -2) {
        if (x > 40) x -= 5;
    } else {
        if (x < 49 + xoffset) x += 5;
        else isRetreated = true;
    }
    this.moveXY(x, y);

};

loop {
    var info = this.detect();

    if (info.enemy && info.dist < 40) {
        if (this.pos.x > 45 && info.dist > 10) {
            isRetreated = false;
            this.moveXY(this.pos.x, safeCorridor);
            this.moveXY(40, safeCorridor);
        }
        if (this.isReady("cleave")) {
            this.cleave(info.enemy);
        } else if (this.isReady("electrocute")) {
            this.electrocute(info.enemy);
        } else {
            this.attack(info.enemy);
        }
    } else {
        if (activeTraps < 20 && isRetreated) {
            this.trap();
        } else {
            this.retreat();
        }
    }
}
