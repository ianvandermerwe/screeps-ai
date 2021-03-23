var roleClaimer = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    if (creep.room.name !== creep.memory.targetRoom) {
      let exit = creep.room.findExitTo(creep.memory.targetRoom)

      creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ff0026'}})
    } else {
      //try to claim controller
      if (creep.claimController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller)
      }
    }

    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
    }
  }
};

module.exports = roleClaimer;
