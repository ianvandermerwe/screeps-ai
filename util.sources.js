var utilSources = {
  findSourceWithoutMiner: function (creep) {
    let containerTargets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType === STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
      }
    });

    let miners = creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => {
        return (creep.memory.role === 'miner')
      }
    });

    if (containerTargets.length > 0) {
      containerTargets.forEach(function (container) {
        let containerClear = true

        miners.forEach(function (miner) {
          if (container.pos.isEqualTo(miner.pos)) {
            containerClear = false
          }
        })

        if (containerClear === true) {
          console.log(creep.pos.getRangeTo(container))
          if (creep.pos.getRangeTo(container) === 0) {
            return creep.pos.findClosestByPath(FIND_SOURCES)[0]
          } else {
            creep.moveTo(container)
          }
        }
      })
    }

    let currentCreepAge = creep.name.split('_');

    let sources = creep.room.find(FIND_SOURCES)
    let compareMiner = null

    miners.forEach(function (miner) {
      if (miner.id !== creep.id) {
        let name = miner.name
        let parts = name.split('_')

        compareMiner = {creep: miner, age: parts[2]}
      }
    })

    if (compareMiner !== null) {
      if (compareMiner.age > currentCreepAge[2]) {
        return sources[0]
      } else {
        return sources[1]
      }
    } else {
      return sources[0]
    }
  }
}

module.exports = utilSources
