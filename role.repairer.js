let unitCreep = require('util.creep');

var roleRepairer = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = true;

    if (unitCreep.checkEnergyCollection(creep)) {
      creep.memory.working = true;

      if (debug) {
        creep.say('🚧 repair');
      }
    } else if (unitCreep.checkWorkingAction(creep)) {
      creep.memory.working = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    }

    if (creep.memory.working) {
      var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
              structure.structureType === STRUCTURE_EXTENSION ||
              structure.structureType === STRUCTURE_SPAWN ||
              structure.structureType === STRUCTURE_TOWER ||
              structure.structureType === STRUCTURE_STORAGE ||
              structure.structureType === STRUCTURE_ROAD ||
              structure.structureType === STRUCTURE_RAMPART ||
              structure.structureType === STRUCTURE_WALL
            ) &&
            structure.hits < structure.hitsMax;
        }
      });

      targets.sort((a, b) => a.hits - b.hits);

      if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});

          if (debug) {
            creep.say('🚧 repair');
          }
        }
      }
    } else {
      unitCreep.fetchEnergy(creep);
    }
  }
};

module.exports = roleRepairer;