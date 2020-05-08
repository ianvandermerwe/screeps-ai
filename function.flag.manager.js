var functionFlagManager = {
  run: function () {



    if (false) {
      let desiredMinions = 0;
      let currentMinions = 0;
      let ticksToDie = 100;

      // if (Number.isInteger(parseInt(flag.name))) {
      //   desiredMinions = parseInt(flag.name);
      //   flag.memory.desiredMinions = desiredMinions;
      // } else {
      //   console.log('Flag "' + flag.name + '" at room ' + flag.room.name + ' has a wrong name!');
      // }

      for (let i in Game.creeps) {
        let creep = Game.creeps[i];
        if (creep.memory.targetFlag == flag.name && creep.ticksToLive > ticksToDie) {

          currentMinions++;
        }
      }
      flag.memory.currentMinions = currentMinions;
      if (SHOW_FLAG_INFO) {
        // Show.assignedMinions(flag, desiredMinions, currentMinions);
      }


      if (currentMinions < desiredMinions) {

        let minDist = 10;
        let distance = 0;
        let targetSpawn = null;

        if (_.isString(flag.memory.targetRoom)) {

          targetSpawn = Game.getObjectById(Game.rooms[flag.memory.targetRoom].memory.spawns[0].id);

        } else {
          for (let i in Game.rooms) {

            if (Game.rooms[i].controller.my) {

              distance = Game.map.getRoomLinearDistance(flag.pos.roomName, Game.rooms[i].name, false);
              if (distance < minDist && null != Game.rooms[i].memory.spawns) {
                minDist = distance;
                flag.memory.targetRoom = Game.rooms[i].name;

                targetSpawn = Game.getObjectById(Game.rooms[flag.memory.targetRoom].memory.spawns[0].id);
                break;
              }
            }
          }
        }

        if (targetSpawn) {
          let extendedAttributes = {};
          let creepRole = '';

          switch (flag.color) {
//RESERVE
            case COLOR_PURPLE:
              if (flag.secondaryColor == COLOR_PURPLE) {
                creepRole = 'flagReserver';
                extendedAttributes = {myRoom: flag.memory.targetRoom, mySpawn: targetSpawn.name, targetFlag: flag.name.toString()};
              } else if (flag.secondaryColor == COLOR_WHITE) {
                creepRole = 'flagClaimer';
                extendedAttributes = {myRoom: flag.memory.targetRoom, mySpawn: targetSpawn.name, targetFlag: flag.name.toString()};
              }
              break;
//HARVEST
            case COLOR_BLUE:
              if (flag.secondaryColor == COLOR_BLUE) {
                creepRole = 'flagHarvester';
                extendedAttributes = {myRoom: flag.memory.targetRoom, mySpawn: targetSpawn.name, targetFlag: flag.name.toString(), harvesting: true};
              }
              break;
//BUILD/ASSIST NEW ROOM
            case COLOR_GREEN:
              if (flag.secondaryColor == COLOR_GREEN) {
                creepRole = 'flagBuilder';
                extendedAttributes = {myRoom: flag.memory.targetRoom, mySpawn: targetSpawn.name, targetFlag: flag.name.toString(), harvesting: true};
              } else if (flag.secondaryColor == COLOR_WHITE) {
                creepRole = 'flagRepairer';
                extendedAttributes = {myRoom: flag.memory.targetRoom, mySpawn: targetSpawn.name, targetFlag: flag.name.toString(), harvesting: true};
              }
              break;
            default:
              break;
          }

          let targetRoom = Game.rooms[flag.memory.targetRoom];
          // let createResult = CreateCreep.run(targetRoom, creepRole, extendedAttributes);
        }
      }
    }
  }
};

module.exports = functionFlagManager;