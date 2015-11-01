// Survive the waves of ogres.
// If you win, the level gets harder, and gives more rewards.
// If you lose, you must wait a day to re-submit.
// Each time you submit gives a new random seed.
this.detect = function() {
    var result = {};
    result.enemy = this.findNearestEnemy();
    if (result.enemy) {
        result.isclose = this.distanceTo(result.enemy) < 1;
    } else {
        result.isclose = false;
    }
    result.cleave = this.isReady("cleave");
    return result;
};

path="eeneesss";

loop {
    var d = this.detect();
    if (d.enemy) {
        if (d.cleave && d.isclose) {
            this.cleave(d.enemy);
        } else {
            this.moveRight();
        }
    } else {
        this.moveRight();
    }
}
