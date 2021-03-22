var utilCreepActions = {
  moveToAndBuild: function (creep, object, room = null) {
    let constructionSites = null

    if(room === null){
      constructionSites = creep.room.find(object);
    }else{
      constructionSites = room.find(object);
    }

    if (constructionSites.length > 0) {
      if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
        // BUILDINGS FOUND AND IS GOING TO BUILD THEM.
        creep.moveTo(constructionSites[0], {visualizePathStyle: {stroke: '#ffffff'}})
        creep.memory.current_action = 'moving_to_destination ' + constructionSites[0].pos
        return true
      }else{
        creep.memory.current_action = 'building_structure ' + constructionSites[0].pos
      }
    }

    // NO BUILDINGS FOUND.
    return false
  },
  moveToAndMine: function (creep, object, room = null){
    let miningNodes = null

    if(room === null){
      miningNodes = creep.room.find(object);
    }else{
      miningNodes = room.find(object);
    }

    if (miningNodes.length > 0) {
      // ADD A CHECK TO SEE IF A MINER IS ON IT
      if (creep.build(miningNodes[0]) === ERR_NOT_IN_RANGE) {
        // NODE FOUND AND IS GOING TO MINE IT.
        creep.moveTo(miningNodes[0], {visualizePathStyle: {stroke: '#ffffff'}})
        creep.memory.current_action = 'moving_to_destination ' + miningNodes[0].pos
        return true
      }else{
        creep.memory.current_action = 'mining_node ' + miningNodes[0].pos
      }
    }

    // NO NODES FOUND.
    return false
  },
  moveToAndUpgradeController: function (creep, room = null) {
    let controller = null

    if(room === null){
      controller = creep.room.controller
    }else{
      controller = room.controller
    }

    if (controller.length > 0) {
      if (creep.upgradeController(controller[0]) === ERR_NOT_IN_RANGE) {
        // CONTROLLER FOUND AND IS GOING TO UPGRADE IT.
        creep.moveTo(controller[0], {visualizePathStyle: {stroke: '#ffffff'}})
        creep.memory.current_action = 'moving_to_destination ' + controller[0].pos
        return true
      }else{
        creep.memory.current_action = 'upgrading_controller ' + controller[0].pos
      }
    }

    // CONTROLLER NOT FOUND.
    return false
  },
  moveToAndFetchEnergy: function(creep, room) {

  },
};

module.exports = utilCreepActions
