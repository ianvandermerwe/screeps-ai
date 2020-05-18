var roleTransporter = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    var primaryRefillTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
            structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });
    var secondaryRefillTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
            // structure.structureType === STRUCTURE_CONTAINER
            structure.structureType === STRUCTURE_CONTAINER ||
            structure.structureType === STRUCTURE_STORAGE
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });

    if (creep.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.working = false;
      if (creep.store.getUsedCapacity(RESOURCE_GHODIUM) > 0 || creep.store.getUsedCapacity(RESOURCE_GHODIUM_OXIDE) > 0){
        creep.drop(RESOURCE_GHODIUM);
        creep.drop(RESOURCE_GHODIUM_OXIDE);
      }

      if (debug) {
        creep.say('🔌 pickup');
      }
    } else if (primaryRefillTargets.length > 0 && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.working = true;

      if (debug) {
        creep.say('🔌 moving');
      }
    } else if (secondaryRefillTargets.length > 0 && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.working = true;

      if (debug) {
        creep.say('🔌 moving');
      }
    }

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) !== 0 && !creep.memory.working) {
      let resources = _.filter(creep.room.find(FIND_DROPPED_RESOURCES));

      var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
              structure.structureType === STRUCTURE_STORAGE
            ) &&
            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
        }
      });

      if (resources.length > 0) {
        if (creep.pickup(resources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(resources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      } else {
        if (containers.length > 0 && primaryRefillTargets > 0) {
          if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
          }
        }
      }
    } else {
      if (creep.memory.working) {
        if (primaryRefillTargets.length > 0) {
          if (creep.transfer(primaryRefillTargets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(primaryRefillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        } else if (secondaryRefillTargets.length > 0) {
          if (creep.transfer(secondaryRefillTargets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(secondaryRefillTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
          }
        }
      }
    }
  }
};

module.exports = roleTransporter;