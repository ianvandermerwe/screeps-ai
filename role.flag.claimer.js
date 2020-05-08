var roleFlagClaimer = {
  run: function (creep) {
    for (var flagName in Game.flags) {
      let ctrl = creep.room.controller;

      // console.log(flag);
      if (flagName === 'claim') {
        var flag = Game.flags[flagName];

        //TODO: check how far the flag is compaird to the creep vs creep TTL
        // creep.ticksToLive

        //If creep has a flag
        if (flag) {
          // console.log(flag.pos);
          //If they are in the same room
          if (creep.room == flag.room) {
            let claimResult = creep.claimController(ctrl);
            console.log(claimResult);

            if (claimResult == ERR_NOT_IN_RANGE) {
              creep.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc00cc'}});
            }
          } else {
            let flagPosition = new RoomPosition(23,42,'W8N3');
            creep.moveTo(flag.pos, {visualizePathStyle: {stroke: '#cc00cc'}});
            // creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
          }
        }
      }
    }
  }
};

module.exports = roleFlagClaimer;