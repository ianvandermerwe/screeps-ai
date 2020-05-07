var functionCreepRespawner = {
  run: function () {

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
        quantity: 4,
        priority: 1000,
        body: [WORK, WORK, CARRY, CARRY, MOVE]
      },
      { // BIG HARVESTER
        role: 'harvester',
        quantity: 2,
        priority: 990,
        body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
      },
      { // NORMAL BUILDER
        role: 'builder',
        quantity: 2,
        priority: 900,
        body: [WORK, CARRY, CARRY, CARRY, MOVE]
      },
      { // NORMAL UP-GRADER
        role: 'upgrader',
        quantity: 2,
        priority: 800,
        body: [WORK, WORK, CARRY, MOVE]
      },
      { // NORMAL REPAIRER
        role: 'repairer',
        quantity: 2,
        priority: 790,
        body: [MOVE, WORK, CARRY, CARRY]
      },
      { // BIG UP-GRADER
        role: 'upgrader',
        quantity: 1,
        priority: 700,
        body: [MOVE, MOVE, MOVE, WORK, WORK, CARRY, CARRY, CARRY, CARRY]
      },
      { // CLAIMER
        role: 'claimer',
        quantity: 1,
        priority: 600,
        body: [MOVE, CLAIM]
      },
      //TODO: add defence attacker
    ];

    creepSpawnConfigs.forEach(function (creepSpawnConfig) {
      var creeps = _.filter(Game.creeps, (creep) => creep.memory.role === creepSpawnConfig.role);
      var creepBodyCheck = false;
      var creepQuantity = 0;

      creeps.forEach(function (creep) {
        if (JSON.stringify(creep.memory.body) === JSON.stringify(creepSpawnConfig.body)) {
          creepQuantity++;
          // creepBodyCheck = true;
        }
      });

      // TODO: add code to allow for priority of creep spawning.
      if (creepQuantity === creepSpawnConfig.quantity) {
        creepBodyCheck = true;
        // console.log(creepBodyCheck, creepQuantity, creepSpawnConfig.quantity);
      }

      if (!creepBodyCheck) {
        var newCreepName = (creepSpawnConfig.role.charAt(0).toUpperCase() + creepSpawnConfig.role.slice(1)) + '_' + Game.time;

        console.log('Spawning new ' + creepSpawnConfig.role + ': ' + newCreepName);
        Game.spawns['Spawn1'].spawnCreep(creepSpawnConfig.body, newCreepName, {
          memory: {
            role: creepSpawnConfig.role,
            body: creepSpawnConfig.body
          }
        });
      }
    });

    // Spawning notification
    if (Game.spawns['Spawn1'].spawning) {
      var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];

      Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, {align: 'left', opacity: 0.8});
    }
  }
};

module.exports = functionCreepRespawner;
