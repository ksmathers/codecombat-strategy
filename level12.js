this.defend = function(x,y) {
    var enemy;
    this.moveXY(x, y);
    while ((enemy = this.findNearestEnemy()) !== null) {
        this.attack(enemy);
    }
};

loop {
    this.defend(35,34);
    this.defend(60,34);
}
