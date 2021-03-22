let unitCreep = require('util.creep')
let utilCreepActions = require('util.creep.actions')

var roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    if (unitCreep.checkEnergyCollection(creep)) {
      creep.memory.working = true;

      if (debug) {
        creep.say('🚧 build');
      }
    } else if (unitCreep.checkWorkingAction(creep)) {
      creep.memory.working = false;

      if (debug) {
        creep.say('🔌 pickup');
      }
    }

    if (creep.memory.working) {
      if(utilCreepActions.moveToAndBuild(creep,FIND_CONSTRUCTION_SITES)){
        // WILL RETURN TRUE AS LONG AS IT CAN BUILD
      }else if (utilCreepActions.moveToAndUpgradeController(creep)) {
        // WILL RETURN TRUE AS LONG AS IT CAN UPGRADE CONTROLLER
      }
    } else {
      unitCreep.fetchEnergy(creep);
    }
  }
};

module.exports = roleBuilder;
