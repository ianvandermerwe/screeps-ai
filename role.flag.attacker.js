var roleFlagAttacker = {
  run: function (creep) {
    let attackPosition = new RoomPosition(26, 24, 'E41N15');
    let enemyCreeps = creep.room.find(FIND_HOSTILE_CREEPS);

    if (creep.room === Game.rooms[attackPosition.roomName] && enemyCreeps.length > 0) {
      if (creep.attack(enemyCreeps[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(enemyCreeps[0], {visualizePathStyle: {stroke: '#cc0000'}});
      }
    } else {
      let moveRet = creep.moveTo(attackPosition, {visualizePathStyle: {stroke: '#cc0000'}});
      // console.log(moveRet);
    }

    // for (var flagName in Game.flags) {
    //   let ctrl = creep.room.controller;
    //
    //   if (flagName === 'attack') {
    //     var flag = Game.flags[flagName];
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
    //           creep.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc0000'}});
    //         }
    //       } else {
    //         let flagPosition = new RoomPosition(37,33,'E41N15');
    //         creep.moveTo(flag.pos, {visualizePathStyle: {stroke: '#cc0000'}});
    //         // creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});
    //       }
    //     }
    //   }
    // }
  }
};

module.exports = roleFlagAttacker;