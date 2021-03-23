var functionCreepRespawner = {
  run: function () {

    var debug = true
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

    var creepSpawnConfigs = [
      { // MINER
        role: 'miner',
        quantity: 2,
        body: [
          {bodyPart: WORK, percent: 80},
          {bodyPart: MOVE, percent: 20},
        ],
        bodyLimit: 11,
        spawnIfEnemies: false
      },
      { // TRANSPORTER
        role: 'transporter',
        quantity: 2,
        body: [
          {bodyPart: CARRY, percent: 50},
          {bodyPart: MOVE, percent: 50},
        ],
        bodyLimit: 11,
        spawnIfEnemies: false
      },
      { // UP-GRADER
        role: 'upgrader',
        quantity: 2,
        body: [
          {bodyPart: WORK, percent: 50},
          {bodyPart: CARRY, percent: 25},
          {bodyPart: MOVE, percent: 25},
        ],
        bodyLimit: 11,
        spawnIfEnemies: false
      },
      { // BUILDER
        role: 'builder',
        quantity: 0,
        body: [
          {bodyPart: CARRY, percent: 40},
          {bodyPart: WORK, percent: 40},
          {bodyPart: MOVE, percent: 20},
        ],
        bodyLimit: 11,
        spawnIfEnemies: false
      },
      { // REPAIRER
        role: 'repairer',
        quantity: 1,
        body: [
          {bodyPart: CARRY, percent: 30},
          {bodyPart: WORK, percent: 40},
          {bodyPart: MOVE, percent: 30},
        ],
        bodyLimit: 11,
        spawnIfEnemies: true
      },
      { // CLAIMER
        role: 'claimer',
        quantity: 0,
        body: [],
        staticBody: [CLAIM, MOVE],
        targetRoom: 'W29N21',
        spawnIfEnemies: true
      },
      { // CLAIMER
        role: 'upgrader',
        quantity: 1,
        body: [
          {bodyPart: WORK, percent: 50},
          {bodyPart: CARRY, percent: 25},
          {bodyPart: MOVE, percent: 25},
        ],
        targetRoom: 'W29N21',
        spawnIfEnemies: true
      },
    ]

    let defenciveAndOffensiveCreeps = [
      { // ATTACKER
        role: 'attacker',
        quantity: 1,
        body: [
          {bodyPart: ATTACK, percent: 50},
          {bodyPart: TOUGH, percent: 1},
          {bodyPart: MOVE, percent: 49},
        ],
        spawnIfEnemies: true
      },

      { // HEALER
        role: 'healer',
        quantity: 2,
        body: [
          {bodyPart: HEAL, percent: 50},
          {bodyPart: MOVE, percent: 50},
        ],
        spawnIfEnemies: true
      },
    ]

    for (var spawn in Game.spawns) {
      let spawnObj = Game.spawns[spawn]

      // If we're spawning a creep or there is no creep to spawn, return early.
      if (spawnObj.spawning) return

      // Calculate total energy in room.
      let extensions = spawnObj.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType == STRUCTURE_EXTENSION)
        }
      });

      let totalEnergyAvailable = spawnObj.store.getUsedCapacity(RESOURCE_ENERGY)
      let totalEnergy = spawnObj.store.getCapacity(RESOURCE_ENERGY)

      if (extensions.length > 0) {
        for (let extension in extensions) {
          totalEnergyAvailable = totalEnergyAvailable + extensions[extension].store.getUsedCapacity(RESOURCE_ENERGY)
          totalEnergy = totalEnergy + extensions[extension].store.getCapacity(RESOURCE_ENERGY)
        }
      }

      // THIS IS A OVERRIDE TO ENSURE ROOM DONT GRIND TO AN HALT.
      let minerCheck = _.filter(spawnObj.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'miner')
      let transporterCheck = _.filter(spawnObj.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === 'transporter')

      if ((minerCheck.length < 1) && (totalEnergyAvailable > 260)) {
        spawnObj.spawnCreep([WORK, WORK, MOVE], 'Miner', {memory: {role: 'miner'}})
      } else if ((transporterCheck.length < 1) && (totalEnergyAvailable > 260)) {
        spawnObj.spawnCreep([CARRY, CARRY, CARRY, MOVE, MOVE], 'Transporter', {memory: {role: 'transporter'}})
      } else if (totalEnergyAvailable < totalEnergy) {
        return
      }

      for (let iteration = 0; iteration < creepSpawnConfigs.length;) {

        // if (creepSpawnConfigs[iteration].role === 'claimer') {
        //   Game.spawns['Spawn1'].spawnCreep(creepSpawnConfigs[iteration].staticBody, 'Claimer', {memory: {role: 'claimer', targetRoom: creepSpawnConfigs[iteration].targetRoom}})
        //   return
        // }

        let creeps = _.filter(spawnObj.room.find(FIND_MY_CREEPS), (creep) => creep.memory.role === creepSpawnConfigs[iteration].role)
        // Rooms can only spawn creeps with a max of 50, so this is our upper limit
        let maxBodyParts = 50

        // TODO: possibly add code to check the room of the creep and where he is located.

        // TODO: add check to see if there are any enemy creeps in this room.

        if (creeps.length < creepSpawnConfigs[iteration].quantity) {

          // if (!previousCreepQuantityMax && previousPriority > creepSpawnConfig.priority) return; // CONTINUE BECAUSE THE PREVIOUS CREEP TYPE OF HIGHER PRIORITY AND IS NOT FULL.

          // THIS WORKS OUT HOW MANY BODY PARTS THIS CREEP TYPE CAN HAVE WITH THE BASE RESOURCES.
          let creepBody = []
          let creepBodyCheck = []
          let costCheck = 0
          let cost = 0

          // THIS BUILDS THE CREEP BODY
          for (let bodyPartConfig of Object.entries(creepSpawnConfigs[iteration].body)) {
            let bodyPartAmount = Math.floor((totalEnergyAvailable / BODYPART_COST[bodyPartConfig[1].bodyPart]) * (bodyPartConfig[1].percent / 100))

            for (let i = 0; i < bodyPartAmount; i++) {
              // PUSH THE REQUIRED AMOUNT OF BODY PARTS ONTO BODY.
              let tmp = ''
              switch (bodyPartConfig[1].bodyPart) {
                case "work":
                  tmp = WORK
                  break
                case "move":
                  tmp = MOVE
                  break
                case "carry":
                  tmp = CARRY
                  break
                case "attack":
                  tmp = ATTACK
                  break
                case "ranged_attack":
                  tmp = RANGED_ATTACK
                  break
                case "heal":
                  tmp = HEAL
                  break
                case "claim":
                  tmp = CLAIM
                  break
                case "tough":
                  tmp = TOUGH
                  break
              }

              if (creepBody.length <= maxBodyParts || creepBody.length <= creepSpawnConfigs[iteration].bodyLimit) {
              // if (creepBody.length <= maxBodyParts && creepBody.length <= creepSpawnConfigs[iteration].bodyLimit) {
                creepBodyCheck.push(tmp)
                costCheck = creepBodyCheck.map((_) => BODYPART_COST[_]).reduce((acc, val) => acc + val, 0)

                if (costCheck < totalEnergyAvailable) {
                  creepBody = creepBodyCheck
                  cost = creepBody.map((_) => BODYPART_COST[_]).reduce((acc, val) => acc + val, 0)
                }
              }
            }
          }

          if (cost <= totalEnergyAvailable) { // SPAWN CREEP IF BASE HAS ENERGY
            let newCreepName = (creepSpawnConfigs[iteration].role.charAt(0).toUpperCase() + creepSpawnConfigs[iteration].role.slice(1)) + '_' + spawnObj.room.name + '_' + Game.time

            if (debug) {
              console.log('Cost - ', cost, 'Available - ', totalEnergyAvailable, 'Total - ', totalEnergy, ':', newCreepName, creepBody)
            }

            //SPAWN CREEP
            var returnCode = spawnObj.spawnCreep(creepBody, newCreepName, {
              memory: {
                role: creepSpawnConfigs[iteration].role,
                working: false,
                targetRoom: creepSpawnConfigs[iteration].targetRoom
              }
            })

            if (debug) {
              // console.log('Spawning new ' + creepSpawnConfigs[iteration].role + ': ' + newCreepName);
              // console.log('Spawn return ' + returnCode);
            }

            //MANUAL CONSOLE SPAWN ACTION
            // Game.spawns['Spawn1'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE],'Harvester',{memory:{role:'harvester'}})
            // Game.spawns['Spawn1'].spawnCreep([WORK,WORK,MOVE],'Miner',{memory:{role:'miner'}})
            // Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE],'Upgrader',{memory:{role:'upgrader'}})
          }

          return
        } else {
          iteration++
        }
      }
      // });

      // Spawning notification
      if (spawnObj.spawning) {
        var spawningCreep = Game.creeps[spawnObj.spawning.name]

        spawnObj.room.visual.text('🛠️ ' + spawningCreep.memory.role, spawnObj.pos.x + 1, spawnObj.pos.y, {align: 'left', opacity: 0.8})
      }
    }
  }
}

module.exports = functionCreepRespawner
