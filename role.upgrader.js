let utilCreepActions = require('util.creep.actions')
let utilCreep = require('util.creep')

var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    }

    if (!creep.memory.upgrading && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;

      if (debug) {
        creep.say('⚡ upgrade');
      }
    }

    if (creep.memory.upgrading && utilCreepActions.moveToAndUpgradeController(creep)) {
      //MOVING TO AND UPGRADING
    } else {
      utilCreep.fetchEnergy(creep);
    }
  }
};

module.exports = roleUpgrader;
