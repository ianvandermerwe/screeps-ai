let unitSources = require('util.sources');

var utilCreepActions = {
  moveToAndBuild: function (creep, object, room = null) {
    let constructionSites = null

    if (room === null) {
      constructionSites = creep.room.find(object);
    } else {
      constructionSites = room.find(object);
    }

    if (constructionSites.length > 0) {
      if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
        // BUILDINGS FOUND AND IS GOING TO BUILD THEM.
        creep.moveTo(constructionSites[0], {visualizePathStyle: {stroke: '#ffffff'}})
        creep.memory.current_action = 'moving_to_destination ' + constructionSites[0].pos
        return true
      } else {
        creep.memory.current_action = 'building_structure ' + constructionSites[0].pos
      }
    }

    // NO BUILDINGS FOUND.
    return false
  },
  moveToAndMine: function (creep, object) {

    if (creep.memory.targetRoom) {
      if (creep.room.name !== creep.memory.targetRoom) {
        let exit = creep.room.findExitTo(creep.memory.targetRoom)

        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffa200'}})
        return true
      }
    }

    let closestSource = unitSources.findSourceWithoutMiner(creep);

    if (closestSource.length > 0) {
      if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
        creep.memory.current_action = 'moving_to_destination ' + closestSource.pos
        return true
      } else {
        creep.memory.current_action = 'mining_node ' + closestSource.pos
        return true
      }
    }

    // NO NODES FOUND.
    return false
  },
  moveToAndUpgradeController: function (creep) {

    if (creep.memory.targetRoom) {
      if (creep.room.name !== creep.memory.targetRoom) {
        let exit = creep.room.findExitTo(creep.memory.targetRoom)

        creep.moveTo(creep.pos.findClosestByRange(exit), {visualizePathStyle: {stroke: '#ffa200'}})
        return true
      }
    }

    // try to upgrade controller
    if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffa200'}})
      creep.memory.current_action = 'moving_to_destination ' + creep.room.controller.pos
      return true
    }

    creep.memory.current_action = 'upgrading_controller ' + creep.room.controller.pos
  }
};

module.exports = utilCreepActions
