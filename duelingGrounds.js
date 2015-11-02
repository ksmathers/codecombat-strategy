this.detect = function() {
    var result = {};
    var enemylist = this.findEnemies();

    // Close enough to hit immediately
    var closest = [];
    if (enemylist.length > 0) {
        var i;
        for (i = 0; i < enemylist.length; i++) {
            var enemy = enemylist[i];
            if (this.distanceTo(enemy) <= 10) {
                closest.push(enemy);
            }
        }
    }
    result.enemy = this.findNearest(enemylist);
    result.enemyCount = closest.length;
    return result;
};

this.autobuild = function(enemy) {
    var dx = enemy.pos.x - this.pos.x;
    var dy = enemy.pos.y - this.pos.y;
    var theta = Math.atan2(dx, dy);
    this.buildangle(theta);
};

this.buildangle = function(theta) {
    var dx = 5 * Math.sin(theta);
    var dy = 5 * Math.cos(theta);

    this.buildXY('bear-trap', this.pos.x + dx, this.pos.y + dy);
};

this.autoattack = function(enemy) {
    if (this.isReady("cleave")) this.cleave(enemy);
    else if (this.isReady("electrocute")) this.electrocute(enemy);
    else this.attack(enemy);
};

this.fortify = function() {
    this.buildXY("fence", this.pos.x, this.pos.y-5);
    this.buildXY("fence", this.pos.x+5, this.pos.y);
    this.buildXY("fence", this.pos.x, this.pos.y+5);
    //this.buildXY("fence", this.pos.x-5, this.pos.y);
};

var angle = 0;
loop {
    var info = this.detect();

    if (info.enemyCount > 0) {
        this.autobuild(info.enemy);
    } else {
        angle += Math.PI / 4;
        this.buildangle(angle);
    }
}
