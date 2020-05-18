var memoryCleanup = require('function.memory.cleanup');
var functionCreepRespawner = require('function.creep.respawner');
var functionFlagManager = require('function.flag.manager');

var roleHarvester = require('role.harvester');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleDefender = require('role.defender');
var roleFlagClaimer = require('role.flag.claimer');

var defenceTower = require('defence.tower');

module.exports.loop = function () {
  functionCreepRespawner.run();

  // var tower = Game.getObjectById('5eba8a5659c9ad1918b4ab3d');
  // defenceTower.run(tower);

  for (let creepHash in Game.creeps) {
    let creep = Game.creeps[creepHash];
    if (creep.my) {
      if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
      } else if (creep.memory.role == 'miner') {
        roleMiner.run(creep);
      } else if (creep.memory.role == 'transporter') {
        roleTransporter.run(creep);
      } else if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
      } else if (creep.memory.role == 'builder') {
        roleBuilder.run(creep);
      } else if (creep.memory.role == 'defender') {
        roleDefender.run(creep);
      } else if (creep.memory.role == 'repairer') {
        roleRepairer.run(creep);
      } else if (creep.memory.role == 'claimer') {
        roleFlagClaimer.run(creep);
      }
    }
  }

  for (let roomHash in Game.rooms) {
    let room = Game.rooms[roomHash];
    var hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      var username = hostiles[0].owner.username;
      Game.notify(`User ${username} spotted in room ${room.name}`);

      var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

      towers.forEach(function (tower) {
        defenceTower.run(tower);
      });
    }
  }

  memoryCleanup.run();
};