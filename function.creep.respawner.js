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
          quantity: 4,
          priority: 1000,
          body: [WORK, CARRY, CARRY, CARRY, MOVE],
          bodyObj: [
            {bodyPart: CARRY, percent: 50},
            {bodyPart: WORK, percent: 30},
            {bodyPart: MOVE, percent: 20},
          ],
          spawnIfEnemies: false
        },
        // { // NORMAL BUILDER
        //   role: 'builder',
        //   quantity: 2,
        //   priority: 900,
        //   body: [WORK, CARRY, CARRY, CARRY, MOVE],
        //   bodyObj: [
        //     {bodyPart: CARRY, percent: 40},
        //     {bodyPart: WORK, percent: 40},
        //     {bodyPart: MOVE, percent: 20},
        //   ],
        //   spawnIfEnemies: false
        // },
        // { // NORMAL UP-GRADER
        //   role: 'upgrader',
        //   quantity: 2,
        //   priority: 800,
        //   body: [WORK, WORK, CARRY, MOVE],
        //   bodyObj: [
        //     {bodyPart: WORK, percent: 50},
        //     {bodyPart: CARRY, percent: 25},
        //     {bodyPart: MOVE, percent: 25},
        //   ],
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
        //   quantity: 1,
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
      ]
    ;

    for (var spawn in Game.spawns) {
      let spawnObj = Game.spawns[spawn];

      // If we're spawning a creep or there is no creep to spawn, return early.
      if (spawnObj.spawning) return;

      // Calculate total energy in room.
      let extentions = spawnObj.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION);
        }
      });

      let totalEnergyAvailable = spawnObj.store.getUsedCapacity(RESOURCE_ENERGY);
      let totalEnergy = spawnObj.store.getCapacity(RESOURCE_ENERGY);

      if (extentions.length > 0) {
        for (var extention in extentions) {
          totalEnergyAvailable = totalEnergyAvailable + extentions[extention].store.getUsedCapacity(RESOURCE_ENERGY);
          totalEnergy = totalEnergy + extentions[extention].store.getCapacity(RESOURCE_ENERGY);
        }
      }

      if (totalEnergyAvailable < totalEnergy) return;

      creepSpawnConfigs.forEach(function (creepSpawnConfig) {
        let creeps = _.filter(spawnObj.room.find(FIND_CREEPS), (creep) => creep.memory.role === creepSpawnConfig.role);
        // Rooms can only spawn creeps with a max of 50, so this is our upper limit
        let maxBodyParts = 50;

        // TODO: add code to allow for priority of creep spawning.

        // Check if there there are less than the required amount of creeps in this room.
        // TODO: possibly add code to check the room of the creep and where he is located.

        if (creeps.length <= creepSpawnConfig.quantity) {

          // THIS WORKS OUT HOW MANY BODY PARTS THIS CREEP TYPE CAN HAVE WITH THE BASE RESOURCES.
          let creepBody = [];
          for (let bodyPartConfig of Object.entries(creepSpawnConfig.bodyObj)) { // THIS BUILDS THE CREEP BODY
            let bodyPartAmount = Math.floor((totalEnergy / BODYPART_COST[bodyPartConfig[1].bodyPart]) * (bodyPartConfig[1].percent / 100));

            for (let i = 0; i < bodyPartAmount; i++) {
              // PUSH THE REQUIRED AMOUNT OF BODY PARTS ONTO BODY.
              let tmp = '';
              switch (bodyPartConfig[1].bodyPart) {
                case "work":
                  tmp = WORK;
                  break;
                case "move":
                  tmp = MOVE;
                  break;
                case "carry":
                  tmp = CARRY;
                  break;
                case "attack":
                  tmp = ATTACK;
                  break;
                case "ranged_attack":
                  tmp = RANGED_ATTACK;
                  break;
                case "heal":
                  tmp = HEAL;
                  break;
                case "claim":
                  tmp = CLAIM;
                  break;
                case "tough":
                  tmp = TOUGH;
                  break;
              }

              if (creepBody.length < maxBodyParts) {
                creepBody.push(tmp);
              }
            }
          }

          const cost = creepBody.map((_) => BODYPART_COST[_]).reduce((acc, val) => acc + val, 0);

          if (cost <= totalEnergy) { // SPAWN CREEP IF BASE HAS ENERGY
            let newCreepName = (creepSpawnConfig.role.charAt(0).toUpperCase() + creepSpawnConfig.role.slice(1)) + '_' + spawnObj.room.name + '_' + Game.time;

            if (debug) {
              console.log('Spawning new ' + creepSpawnConfig.role + ': ' + newCreepName);
            }

            //SPAWN CREEP
            spawnObj.spawnCreep(creepBody, newCreepName, {
              memory: {
                role: creepSpawnConfig.role,
                working: false
              }
            });
          }
        }
      });

      // Spawning notification
      if (spawnObj.spawning) {
        var spawningCreep = Game.creeps[spawnObj.spawning.name];

        spawnObj.room.visual.text('🛠️ ' + spawningCreep.memory.role, spawnObj.pos.x + 1, spawnObj.pos.y, {align: 'left', opacity: 0.8});
      }
    }
  }
};

module.exports = functionCreepRespawner;
