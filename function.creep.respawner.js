var functionCreepRespawner = {
  run: function () {

    var debug = true;
    /*
    --- CONSTANTS ---
      MOVE:           50
      WORK:           100
      CARRY:          50
      ATTACK:         80
      RANGED_ATTACK : 150
      HEAL :          250
      TOUGH :         10
      CLAIM :         600
     */

    //TODO: create tiered system to scale workers depending the stored energy + extentions.
    var creepSpawnConfigs = [
      { // NORMAL HARVESTER
        role: 'harvester',
        quantity: 6,
        priority: 1000,
        // body: 'WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE',
        body: {CARRY: 50, WORK: 30, MOVE: 20},
        spawnIfEnemies: false
      },
      // { // NORMAL BUILDER
      //   role: 'builder',
      //   quantity: 2,
      //   priority: 900,
      //   body: [WORK, CARRY, CARRY, CARRY, MOVE],
      //   spawnIfEnemies: false
      // },
      // { // NORMAL UP-GRADER
      //   role: 'upgrader',
      //   quantity: 3,
      //   priority: 800,
      //   body: [WORK, WORK, CARRY, MOVE],
      //   spawnIfEnemies: false
      // },
      // { // ATTACKER
      //   role: 'attacker',
      //   quantity: 1,
      //   priority: 800,
      //   body: [MOVE, ATTACK, ATTACK, ATTACK],
      //   spawnIfEnemies: true
      // },
      // { // HEALER
      //   role: 'healer',
      //   quantity: 2,
      //   priority: 790,
      //   body: [MOVE, HEAL],
      //   spawnIfEnemies: true
      // },
      // { // NORMAL REPAIRER
      //   role: 'repairer',
      //   quantity: 2,
      //   priority: 750,
      //   body: [MOVE, WORK, CARRY, CARRY],
      //   spawnIfEnemies: true
      // },
      // { // CLAIMER
      //   role: 'claimer',
      //   quantity: 1,
      //   priority: 600,
      //   body: [MOVE, CLAIM], // COST 650
      //   spawnIfEnemies: false
      // },
    ];

    for (var spawn in Game.spawns) {
      let spawnObj = Game.spawns[spawn];
      let extentions = spawnObj.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION);
        }
      });

      let totalEnergy = spawnObj.store.getUsedCapacity(RESOURCE_ENERGY);
      if (extentions.length > 0) {
        for (var extention in extentions) {
          totalEnergy = totalEnergy + extention.store.getUsedCapacity(RESOURCE_ENERGY);
        }
      }

      creepSpawnConfigs.forEach(function (creepSpawnConfig) {
        var creeps = _.filter(spawnObj.room.creeps, (creep) => creep.memory.role === creepSpawnConfig.role);
        var shouldSpawnMore = true;
        var creepQuantity = 0;


        creeps.forEach(function (creep) { // COUNTING CREEPS OF SAME TYPE
          if (JSON.stringify(creep.memory.body) === JSON.stringify(creepSpawnConfig.body)) {
            creepQuantity++;
          }
        });

        // TODO: add code to allow for priority of creep spawning.
        if (creepQuantity === creepSpawnConfig.quantity) {
          shouldSpawnMore = false;
        }

        if (shouldSpawnMore) {
          var newCreepName = (creepSpawnConfig.role.charAt(0).toUpperCase() + creepSpawnConfig.role.slice(1)) + '_' + Game.time;

          if (debug) {
            console.log('Spawning new ' + creepSpawnConfig.role + ': ' + newCreepName);
          }

          const cost = creepSpawnConfig.body.map((_) => BODYPART_COST[_]).reduce((acc, val) => acc + val, 0);
          console.log(cost,totalEnergy);

          spawnObj.spawnCreep(creepSpawnConfig.body, newCreepName, {
            memory: {
              role: creepSpawnConfig.role,
              body: creepSpawnConfig.body
            }
          });
          // Game.spawns['Spawn1'].spawnCreep(creepSpawnConfig.body, newCreepName, {
          //   memory: {
          //     role: creepSpawnConfig.role,
          //     body: creepSpawnConfig.body
          //   }
          // });
        }
      });
    }

    // creepSpawnConfigs.forEach(function (creepSpawnConfig) {
    //   var creeps = _.filter(Game.creeps, (creep) => creep.memory.role === creepSpawnConfig.role);
    //   var creepBodyCheck = false;
    //   var creepQuantity = 0;

    // creeps.forEach(function (creep) {
    //   if (JSON.stringify(creep.memory.body) === JSON.stringify(creepSpawnConfig.body)) {
    //     creepQuantity++;
    //     // creepBodyCheck = true;
    //   }
    // });

    // if (creepQuantity === creepSpawnConfig.quantity) {
    //   creepBodyCheck = true;
    //   // console.log(creepBodyCheck, creepQuantity, creepSpawnConfig.quantity);
    // }

    // if (!creepBodyCheck) {
    //   var newCreepName = (creepSpawnConfig.role.charAt(0).toUpperCase() + creepSpawnConfig.role.slice(1)) + '_' + Game.time;
    //
    //   if (debug) {
    //     console.log('Spawning new ' + creepSpawnConfig.role + ': ' + newCreepName);
    //   }
    //
    //   Game.spawns['Spawn1'].spawnCreep(creepSpawnConfig.body, newCreepName, {
    //     memory: {
    //       role: creepSpawnConfig.role,
    //       body: creepSpawnConfig.body
    //     }
    //   });
    // }
    // });

    // Spawning notification
    if (Game.spawns['Spawn1'].spawning) {
      var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];

      Game.spawns['Spawn1'].room.visual.text('🛠️ ' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, {align: 'left', opacity: 0.8});
    }
  }
};

module.exports = functionCreepRespawner;
