var roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    var sources = creep.room.find(FIND_SOURCES);
    var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
    var repairBuildingTargets = creep.room.find(FIND_STRUCTURES);

    if (!creep.memory.building && creep.store[RESOURCE_ENERGY] === 0 || !creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false;
      creep.memory.upgrading = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    } else if (buildingTargets.length > 0 && creep.store.getFreeCapacity() === 0) {
      creep.memory.building = true;
      creep.memory.upgrading = false;

      if (debug) {
        creep.say('🚧 build');
      }
    } else if (buildingTargets.length === 0 && creep.store.getFreeCapacity() === 0) {
      creep.memory.upgrading = true;
      creep.memory.building = false;

      if (debug) {
        creep.say('⚡ upgrade');
      }
    }

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !creep.memory.upgrading && creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !creep.memory.building) {
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      if (creep.memory.building) {
        if (creep.build(buildingTargets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(buildingTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      } else if (creep.memory.upgrading) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }
  }
};

module.exports = roleBuilder;