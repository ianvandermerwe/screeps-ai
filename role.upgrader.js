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

    if (creep.memory.upgrading) {
//      if(creep.memory.targetRoom){
//        if (creep.room.name !== creep.memory.targetRoom) {
//          let exit = creep.room.findExitTo(creep.memory.targetRoom)
//
//          creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffa200'}})
//        } else {
          //try to claim controller
          //if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
          //  creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffa200'}})
//          }
//        }
//      }else 
      if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffa200'}});
      }
    } else {
      let resources = _.filter(creep.room.find(FIND_DROPPED_RESOURCES))

      if (resources.length > 0) {
        if (creep.pickup(resources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(resources[0], {visualizePathStyle: {stroke: '#fff300'}});
        }
      }
    }

  }
};

module.exports = roleUpgrader;
