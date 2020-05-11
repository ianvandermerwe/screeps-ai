var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.upgrading = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    }

    if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      creep.memory.upgrading = true;

      if (debug) {
        creep.say('⚡ upgrade');
      }
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      }
    } else {
      var storage = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
              structure.structureType == STRUCTURE_STORAGE
            ) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      });
      var sources = creep.room.find(FIND_SOURCES);

      if (storage.length > 0 && storage[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.withdraw(storage[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      } else if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
};

module.exports = roleUpgrader;