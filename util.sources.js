var utilSources = {
  findSourceWithoutMiner: function (creep) {
    let currentCreepAge = creep.name.split('_');

    let miners = creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => {
        return (creep.memory.role === 'miner')
      }
    });

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
