this.tacticalHarvest = function(x,y) {
    var enemy;
    var attacked = false;
    while ((enemy = this.findNearestEnemy()) !== null) {
        this.attack(enemy);
        attacked = true;
    }
    if (!attacked) {
        this.attack('Chest');
    } else {
        this.moveXY(x, y);
    }
};


loop {
    //this.tacticalHarvest(22,28);
    //this.tacticalHarvest(25,32);
    //this.tacticalHarvest(28,28);
    //this.tacticalHarvest(25,23);
    this.tacticalHarvest(22,24);
    this.tacticalHarvest(28,24);
}
