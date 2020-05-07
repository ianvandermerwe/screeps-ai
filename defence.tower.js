var defenceTower = {
  /** @param {tower} tower **/
  run: function (tower) {

    if (tower) {
      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
        tower.attack(closestHostile);
      } else {
        if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 500) {
          var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
          });
          if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
          }
        }
      }
    }
  }
};

module.exports = defenceTower;