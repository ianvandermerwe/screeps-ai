var roleFlagClaimer = {
  run: function (creep) {
    let claimPosition = new RoomPosition(38, 34, 'E41N15');
    let ctrl = creep.room.controller;
    let claimRet = creep.claimController(ctrl);
    // console.log(claimRet);

    if (creep.claimController(ctrl) === ERR_NOT_IN_RANGE) {
      creep.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc00cc'}});
    }

    // if (creep.pos === claimPosition) {
    //   console.log('smae');
    //
    // } else {
    //   let moveRet = creep.moveTo(claimPosition, {visualizePathStyle: {stroke: '#cc00cc'}});
    //   console.log(moveRet);
    // }

    // }

    // for (var flagName in Game.flags) {
    //   let ctrl = creep.room.controller;
    //
    //   // console.log(flag);
    //   if (flagName === 'claim') {
    //     var flag = Game.flags[flagName];
    //
    //     //TODO: check how far the flag is compared to the creep vs creep TTL
    //     // creep.ticksToLive
    //
    //     //If creep has a flag
    //     if (flag) {
    //       // console.log(flag.pos);
    //       //If they are in the same room
    //       if (creep.room == flag.room) {
    //         let claimResult = creep.claimController(ctrl);
    //         console.log(claimResult);
    //
    //         if (claimResult == ERR_NOT_IN_RANGE) {
    //           creep.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc00cc'}});
    //         }
    //       } else {
    //         let flagPosition = new RoomPosition(39,35,'E41N15');
    //         creep.moveTo(flag.pos, {visualizePathStyle: {stroke: '#cc00cc'}});
    //         // creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
    //       }
    //     }
    //   }
    // }
  }
};

module.exports = roleFlagClaimer;