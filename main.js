let memoryCleanup = require('function.memory.cleanup');
let functionCreepRespawner = require('function.creep.respawner');
let functionFlagManager = require('function.flag.manager');
let utilCreepSpawner = require('util.creep.spawner');

let defenceTower = require('defence.tower');

let roleMiner = require('role.miner');
let roleTransporter = require('role.transporter');
let roleUpgrader = require('role.upgrader');
let roleBuilder = require('role.builder');
let roleRepairer = require('role.repairer');
let roleDefender = require('role.defender');
let roleClaimer = require('role.claimer');
let roleFlagAttacker = require('role.flag.attacker');

let minCreeps = {
  'miner': 2,
  'transporter': 2,
  'builder': 1,
  'repairer': 1,
  'wall_repairer': 1
}

//Claiming
//https://www.youtube.com/watch?v=b_dn8a7xvec&t=538s

//Mining
//https://www.youtube.com/watch?v=ehXu5nbQQaI&t=1s

let numberOfMiners = _.sum(Game.creeps, (creep) => creep.memory === 'miner')
let numberOfTransporters = _.sum(Game.creeps, (creep) => creep.memory === 'miner')

module.exports.loop = function () {
  functionCreepRespawner.run();

  // var tower = Game.getObjectById('5eba8a5659c9ad1918b4ab3d');
  // defenceTower.run(tower);

  for (let spawn in Game.spawns) {
    let spawnObj = Game.spawns[spawn]
    let remoteCreep = false

    // console.log(Memory.creeps)
    // for (let creep in Memory[0].creeps) {
    //   if(creep.targetRoom){
    //     remoteCreep = true
    //   }
    // }

      utilCreepSpawner.spawnCreep(spawnObj, 'upgrader', 'Upgrader', [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE], 'small', 'W29N21')
  }

  for (let creepHash in Game.creeps) {
    let creep = Game.creeps[creepHash]

    if (creep.my) {
      if (creep.memory.role === 'miner') {
        roleMiner.run(creep)
      } else if (creep.memory.role === 'transporter') {
        roleTransporter.run(creep)
      } else if (creep.memory.role === 'upgrader') {
        roleUpgrader.run(creep)
      } else if (creep.memory.role === 'builder') {
        roleBuilder.run(creep)
      } else if (creep.memory.role === 'defender') {
        roleDefender.run(creep)
      } else if (creep.memory.role === 'repairer') {
        roleRepairer.run(creep)
      } else if (creep.memory.role === 'attacker') {
        roleFlagAttacker.run(creep)
      } else if (creep.memory.role === 'claimer') {
        roleClaimer.run(creep)
      }
    }
  }

  for (let roomHash in Game.rooms) {
    let room = Game.rooms[roomHash];
    var hostiles = room.find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      // var username = hostiles[0].owner.username;
      // Game.notify(`User ${username} spotted in room ${room.name}`);

      var towers = room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

      towers.forEach(function (tower) {
        defenceTower.run(tower);
      });
    }
  }

  memoryCleanup.run();
};
