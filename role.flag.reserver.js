//Assign new flag will execute if i remove the flag creep belongs to
const AssignNewFlag = require('routines.assignNewFlag');

var roleFlagReserver = {

  run: function (creep) {
    let flag = Game.flags[creep.memory.targetFlag];
    let ctrl = creep.room.controller;

    //If creep has a flag
    if (flag && flag.color == COLOR_PURPLE && flag.secondaryColor == COLOR_PURPLE) {

      //If they are in the same room
      if (creep.room == flag.room) {

        let reserveResult = creep.reserveController(ctrl);

        if (reserveResult == ERR_NOT_IN_RANGE) {
          creep.moveTo(ctrl, {visualizePathStyle: {stroke: '#cc00cc'}});
        }

      } else {

        creep.moveTo(flag, {visualizePathStyle: {stroke: '#cc00cc'}});

      }

    } else {

      AssignNewFlag.run(creep, COLOR_PURPLE, COLOR_PURPLE);

    }

  }

};
module.exports = roleFlagReserver;