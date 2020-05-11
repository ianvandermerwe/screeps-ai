var roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = true;

    var sources = creep.room.find(FIND_SOURCES);
    var buildingTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
    var maxEnergy = creep.store.getCapacity(RESOURCE_ENERGY);
    var repairBuildingTargets = creep.room.find(FIND_STRUCTURES);

    // console.log(creep.store.getFreeCapacity(RESOURCE_ENERGY),creep.store.getUsedCapacity());
    // if (!creep.memory.building && creep.store[RESOURCE_ENERGY] === 0 || !creep.memory.upgrading && creep.store[RESOURCE_ENERGY] === 0) {
    if (creep.memory.building && creep.store.getUsedCapacity() === 0) {
      creep.memory.building = false;
      // creep.memory.upgrading = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    } else if (buildingTargets.length > 0 && creep.store.getUsedCapacity() === maxEnergy) {
      creep.memory.building = true;
      // creep.memory.upgrading = false;

      if (debug) {
        creep.say('🚧 build');
      }
    }
    // else if (buildingTargets.length === 0 && creep.store.getFreeCapacity() === 0) {
    //   // creep.memory.upgrading = true;
    //   creep.memory.building = false;
    //
    //   if (debug) {
    //     creep.say('⚡ upgrade');
    //   }
    // }

    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0 && !creep.memory.building) {
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    } else {
      if (creep.memory.building) {
        if (creep.build(buildingTargets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(buildingTargets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
      // else if (creep.memory.upgrading) {
      //   if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      //     creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
      //   }
      // }
    }
  }
};

module.exports = roleBuilder;