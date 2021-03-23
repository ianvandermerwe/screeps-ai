let unitCreep = require('util.creep');

var roleTransporter = {
  /** @param {Creep} creep **/
  run: function (creep) {

    let debug = true;

    let primaryRefillTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
            structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER ||
            structure.structureType === STRUCTURE_LINK
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });

    let secondaryRefillTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
            structure.structureType === STRUCTURE_CONTAINER ||
            structure.structureType === STRUCTURE_STORAGE
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });

    if (unitCreep.checkEnergyCollection(creep)) {
      creep.memory.working = true;

      if (debug) {
        creep.say('🔌 moving');
      }
    } else if (unitCreep.checkWorkingAction(creep)) {
      creep.memory.working = false;

      if (debug) {
        creep.say('🔌 pickup');
      }
    }

    if (creep.memory.working) {
      if (primaryRefillTargets.length > 0) {
        if (creep.transfer(primaryRefillTargets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(primaryRefillTargets[0], {visualizePathStyle: {stroke: '#fff300'}});
        }
      } else if (secondaryRefillTargets.length > 0) {
        if (creep.transfer(secondaryRefillTargets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(secondaryRefillTargets[0], {visualizePathStyle: {stroke: '#fff300'}});
        }
      }else{
        let flag = creep.room.find(FIND_FLAGS,{
          filter: (flag) => {
          return flag.name === 'EnergyDropOff'
        }})
        // console.log(creep.room.find(spawnPos[0], {visualizePathStyle: {stroke: '#fff300'}}))
        // if (creep.transfer(creep.room.find(STRUCTURE_CONTROLLER)[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //   console.log('move to controller')
        console.log(creep.pos,creep.room.find(FIND_FLAGS)[0].pos)
          if(creep.moveTo(creep.room.find(FIND_FLAGS)[0], {visualizePathStyle: {stroke: '#fff300'}})){
            creep.drop(RESOURCE_ENERGY,creep.store.getUsedCapacity(RESOURCE_ENERGY))
          }
        // }
      }
    } else {
      let resources = _.filter(creep.room.find(FIND_DROPPED_RESOURCES))

      if (resources.length > 0) {
        if (creep.pickup(resources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(resources[0], {visualizePathStyle: {stroke: '#fff300'}});
        }
      }else if(primaryRefillTargets.length > 0){
        let storage = _.filter(creep.room.find(STRUCTURE_STORAGE))

        if (creep.pickup(storage[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(storage[0], {visualizePathStyle: {stroke: '#fff300'}});
        }
      }
    }
  }
};

module.exports = roleTransporter;
