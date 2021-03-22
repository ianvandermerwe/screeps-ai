var utilSources = {
  findSourceWithoutMiner: function (creep) {
    let currentCreepAge = creep.name.split('_');

    let miners = creep.room.find(FIND_MY_CREEPS, {
      filter: (creep) => {
        return (creep.memory.role == 'miner');
      }
    });

    let sources = creep.room.find(FIND_SOURCES);
    let compareMiner = null;

    miners.forEach(function (miner) {
      if (miner.id !== creep.id) {
        let name = miner.name;
        let parts = name.split('_');

        compareMiner = {creep: miner, age: parts[2]};
      }
    });

    if (compareMiner !== null) {
      if (compareMiner.age > currentCreepAge[2]) {
        return sources[0];
      } else {
        return sources[1];
      }
    } else {
      return sources[0];
    }

    // // TODO: tweak this to check if source has a miner next to source.
    //
    // sources.forEach(function (source) {
    //   let minerAtNode = 0;
    //   let creepCheck = '';
    //   /**
    //    * CONSTANTS
    //    * 0 : PLAIN
    //    * 1 : WALL
    //    * 2 : SWAMP
    //    */
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x - 1, source.pos.y - 1))) { // CHECK ABOVE LEFT
    //     creepCheck = new RoomPosition(source.pos.x - 1, source.pos.y - 1, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x, source.pos.y - 1))) { // CHECK ABOVE
    //     creepCheck = new RoomPosition(source.pos.x, source.pos.y - 1, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x + 1, source.pos.y - 1))) { // CHECK ABOVE RIGHT
    //     creepCheck = new RoomPosition(source.pos.x + 1, source.pos.y - 1, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x - 1, source.pos.y))) { // CHECK LEFT
    //     creepCheck = new RoomPosition(source.pos.x - 1, source.pos.y, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x + 1, source.pos.y))) { // CHECK RIGHT
    //     creepCheck = new RoomPosition(source.pos.x + 1, source.pos.y, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x - 1, source.pos.y + 1))) { // CHECK BELOW LEFT
    //     creepCheck = new RoomPosition(source.pos.x - 1, source.pos.y + 1, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x, source.pos.y + 1))) { // CHECK BELOW
    //     creepCheck = new RoomPosition(source.pos.x, source.pos.y + 1, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x + 1, source.pos.y + 1))) { // CHECK BELOW RIGHT
    //     creepCheck = new RoomPosition(source.pos.x + 1, source.pos.y + 1, creep.room.name).lookFor(LOOK_CREEPS);
    //     if (creepCheck !== '') {
    //       if (creepCheck.length > 0 && creepCheck[0].memory.role === 'miner' && creepCheck[0].id !== creep.id) {
    //         minerAtNode++;
    //       }
    //     }
    //   }
    //
    //   if (minerAtNode === 0) {
    //     return source;
    //   }
    // });
    //
    // return sources[0];
  }
};

module.exports = utilSources;