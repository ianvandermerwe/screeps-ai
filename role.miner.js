let unitSources = require('util.sources');

var roleMiner = {
  /** @param {Creep} creep **/
  run: function (creep) {

    var debug = false;

    let closestSource = unitSources.findSourceWithoutMiner(creep);

    if (creep.harvest(closestSource) === ERR_NOT_IN_RANGE) {
      creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
  }
};

module.exports = roleMiner;