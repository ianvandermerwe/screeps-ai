var memoryCleanup = require('function.memory.cleanup');
var functionCreepRespawner = require('function.creep.respawner');
var functionFlagManager = require('function.flag.manager');

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleFlagClaimer = require('role.flag.claimer');

var defenceTower = require('defence.tower');

module.exports.loop = function () {
  functionCreepRespawner.run();

  // var towers = creep.room.find(FIND_STRUCTURES, {
  //   filter: (structure) => {
  //     return (structure.structureType == STRUCTURE_TOWER);
  //   }
  // });
  // console.log(Game.spawns);

  var tower = Game.getObjectById('5eb3f4ad77c4f0077ad39e2e');
  defenceTower.run(tower);

  // console.log(Game.rooms['W8N3']);
  // console.log(Game.rooms);

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];
    if (creep.my) {
      if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      }
      if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      }
      if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      }
      if (creep.memory.role == 'defender') {
        roleDefender.run(creep);
      }
      if (creep.memory.role == 'repairer') {
        roleRepairer.run(creep);
      }
      if (creep.memory.role == 'claimer') {
        roleFlagClaimer.run(creep);
      }
    } else {
      // this is an enemy creep
    }
  }

  memoryCleanup.run();
};