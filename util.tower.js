var utilTowers = {
  /** @param {tower} tower **/
  run: function (tower) {
    let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
    if (closestHostile) {
      let attackResponse = tower.attack(closestHostile)

      if (attackResponse === ERR_NOT_ENOUGH_RESOURCES) {

      }
    } else {
      //TODO: write code to only repair if spawn and extentions are fully recharged.

      if (tower.store.getUsedCapacity(RESOURCE_ENERGY) > 600) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) =>
            (
            structure.structureType === STRUCTURE_WALL ||
            structure.structureType === STRUCTURE_RAMPART
            ) &&
            structure.hits < structure.hitsMax
        });

        if (closestDamagedStructure) {
          tower.repair(closestDamagedStructure)
        }
      }
    }
  }
};

module.exports = utilTowers;
