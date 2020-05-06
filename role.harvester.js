var roleHarvester = {

  /** @param {Creep} creep **/
  run: function (creep) {

    if (creep.store.getFreeCapacity() > 0) {
      var sources = creep.room.find(FIND_SOURCES);

      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });
      // console.log('targets' + targets.length);
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }else{
        var constructionTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (constructionTargets.length) {
          if (creep.build(constructionTargets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(constructionTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
      // else{
      //   if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      //   }
      // }
    }
  }
};

module.exports = roleHarvester;