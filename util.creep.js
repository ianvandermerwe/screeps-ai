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
    let resources = _.filter(creep.room.find(FIND_DROPPED_RESOURCES));

    var container = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_CONTAINER) &&
          structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
      }
    });

    if (container.length > 0) {
      if (container[0].store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.withdraw(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        }
      }
    } else if (resources.length > 0) {
      if (creep.pickup(resources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(resources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
};

module.exports = utilCreep;
