var roleRepairer = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    if (creep.memory.repairing && creep.carry.energy == 0) {
      creep.memory.repairing = false;

      if (debug) {
        creep.say('🔄 harvest');
      }
    } else if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
      creep.memory.repairing = false;
      if (debug) {
        creep.say('🔄 harvest');
      }
    } else if (!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
      creep.memory.repairing = true;

      if (debug) {
        creep.say('🚧 repair');
      }
    }

    if (creep.memory.repairing) {
      const targets = creep.room.find(FIND_STRUCTURES);
      targets.sort((a, b) => a.hits - b.hits);
      if (targets.length) {
        if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});

          if (debug) {
            creep.say('🚧 repair');
          }
        }
      }
    } else {
      var sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
};

module.exports = roleRepairer;