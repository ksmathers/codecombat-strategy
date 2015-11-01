// Use your new "cleave" skill as often as you can.

this.moveXY(23, 23);
loop {
    var enemy = this.findNearestEnemy();
    if (this.isReady("cleave")) {
        // Cleave the enemy!
        this.cleave(enemy);
    }
    else {
        // Else (if cleave isn't ready), do your normal attack.
        this.attack(enemy);
    }
}
