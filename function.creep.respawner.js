var functionCreepRespawner = {
  run: function () {

    // --------------- Harvester Spawn Check --------------
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    // console.log('Harvesters: ' + harvesters.length);

    if (harvesters.length < 3) {
      var newHarversterName = 'Harvester' + Game.time;
      console.log('Spawning new harvester: ' + newHarversterName);

      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newHarversterName,
        {memory: {role: 'harvester'}});
    }

    // --------------- Builder Spawn Check --------------
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    // console.log('Harvesters: ' + harvesters.length);

    if (builders.length < 2) {
      var newBuilderName = 'Builder' + Game.time;
      console.log('Spawning new builder: ' + newBuilderName);

      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newBuilderName,
        {memory: {role: 'builder'}});
    }

    // --------------- Upgrader Spawn Check --------------
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    // console.log('Harvesters: ' + harvesters.length);

    if (upgraders.length < 1) {
      var newUpgraderName = 'Builder' + Game.time;
      console.log('Spawning new upgrader: ' + newUpgraderName);

      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, MOVE], newUpgraderName,
        {memory: {role: 'upgrader'}});
    }

    // Spawning notification
    if (Game.spawns['Spawn1'].spawning) {
      var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];

      Game.spawns['Spawn1'].room.visual.text('🛠️' + spawningCreep.memory.role, Game.spawns['Spawn1'].pos.x + 1, Game.spawns['Spawn1'].pos.y, {align: 'left', opacity: 0.8});
    }
  }
};

module.exports = functionCreepRespawner;
