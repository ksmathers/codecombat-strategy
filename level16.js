// Survive both waves by shielding and cleaving.
// When "cleave" is not ready, use your shield skill.
// You'll need at least 142 health to survive.
this.lastStand = function(x,y) {
    this.moveXY(57, 32);
    while (!this.isReady("cleave")) {
        this.shield();
    }
    enemy = this.findNearestEnemy();
    this.cleave(enemy);
};
this.lastStand(30,46);
this.lastStand(57,32);
