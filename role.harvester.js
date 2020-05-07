var roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    var sources = creep.room.find(FIND_SOURCES);
    var refillTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
            structure.structureType == STRUCTURE_TOWER ||
            structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });

    if (!creep.memory.recharging && creep.store[RESOURCE_ENERGY] === 0 || !creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false;
      creep.memory.recharging = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    } else if (refillTargets.length > 0 && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.recharging = true;
      creep.memory.upgrading = false;

      if (debug) {
        creep.say('⚡ recharge');
      }
    } else if (refillTargets.length === 0 && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.upgrading = true;
      creep.memory.recharging = false;

      if (debug) {
        creep.say('⚡ upgrade');
      }
    }

    // If is not upgrading and is noy recharging and has storage space go and harvest.
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !creep.memory.upgrading && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !creep.memory.recharging) {
      if (creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)) == ERR_NOT_IN_RANGE) {
        // if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      // If creep is charged and full go and recharge buildings.
      if (creep.memory.recharging) {
        // console.log(refillTargets);
        if (creep.transfer(refillTargets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(refillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }

      // If creep is charged and full go and upgrade if no buildings needs recharging.
      if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
  }
};

module.exports = roleHarvester;