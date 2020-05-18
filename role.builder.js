var roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES);

    if (creep.memory.building && creep.store.getFreeCapacity(RESOURCE_ENERGY) === creep.store.getCapacity(RESOURCE_ENERGY)) {
      creep.memory.building = false;

      if (debug) {
        creep.say('🔌 pickup');
        // creep.say('🔄 harvest');
      }
    } else if (buildingTargets.length > 0 && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
      creep.memory.building = true;

      if (debug) {
        creep.say('🚧 build');
      }
    }

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) !== 0 && !creep.memory.building) {
      let resources = _.filter(creep.room.find(FIND_DROPPED_RESOURCES));
      var container = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_CONTAINER || structure.structureType === STRUCTURE_STORAGE);
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
    } else if (creep.memory.building) {
      if (creep.build(buildingTargets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(buildingTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
      }
    }
  }
};

module.exports = roleBuilder;