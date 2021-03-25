var utilCreep = {
  checkEnergyCollection: function (creep) {
    let usedCapacity = creep.store.getUsedCapacity(RESOURCE_ENERGY);
    let totalCapacity = creep.store.getCapacity(RESOURCE_ENERGY);

    return !creep.memory.working && usedCapacity === totalCapacity;
  },

  checkWorkingAction: function (creep) {
    // let freeCapacity = creep.store.getFreeCapacity(RESOURCE_ENERGY);
    let usedCapacity = creep.store.getUsedCapacity(RESOURCE_ENERGY);

    return creep.memory.working && usedCapacity === 0
  },

  fetchEnergy: function (creep) {
    let dropped_resources = _.filter(creep.room.find(FIND_DROPPED_RESOURCES));

    var containers = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_CONTAINER) &&
          structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    });

    let closestContainer = null
    if (containers.length > 0) {
      if (containers[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(containers[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
    } else if (dropped_resources.length > 0) {
      if (creep.pickup(dropped_resources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(dropped_resources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
};

module.exports = utilCreep;
