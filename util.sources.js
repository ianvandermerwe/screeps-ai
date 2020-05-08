var utilSources = {
  findBestOpenSource: function (creep) {
    var sources = creep.room.find(FIND_SOURCES);
    let closestSource = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);

    sources.forEach(function (source) {
      let hasEnergy = (source.energy > 0);
      let mineAbleSpots = 0;
      /**
       * CONSTANTS
       * 0 : PLAIN
       * 1 : WALL
       * 2 : SWAMP
       */

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x - 1, source.pos.y - 1))) { // CHECK ABOVE LEFT
        if ((new RoomPosition(source.pos.x - 1, source.pos.y - 1, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x, source.pos.y - 1))) { // CHECK ABOVE
        if ((new RoomPosition(source.pos.x, source.pos.y - 1, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }
      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x + 1, source.pos.y - 1))) { // CHECK ABOVE RIGHT
        if ((new RoomPosition(source.pos.x + 1, source.pos.y - 1, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x - 1, source.pos.y))) { // CHECK LEFT
        if ((new RoomPosition(source.pos.x - 1, source.pos.y, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x + 1, source.pos.y))) { // CHECK RIGHT
        if ((new RoomPosition(source.pos.x + 1, source.pos.y, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x - 1, source.pos.y + 1))) { // CHECK BELOW LEFT
        if ((new RoomPosition(source.pos.x - 1, source.pos.y + 1, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x, source.pos.y + 1))) { // CHECK BELOW
        if ((new RoomPosition(source.pos.x, source.pos.y + 1, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      if (0 === (new Room.Terrain(creep.room.name).get(source.pos.x + 1, source.pos.y + 1))) { // CHECK BELOW RIGHT
        if ((new RoomPosition(source.pos.x + 1, source.pos.y + 1, creep.room.name).lookFor(LOOK_CREEPS) == '')) {
          mineAbleSpots++;
        }
      }

      // TODO: return source if closest and is open and has energy. Else goto other room and find source.
      // console.log(source.id, 'spots - ' + mineAbleSpots,'has energy - ' + hasEnergy);
    });

    return sources[0];
  }
};

module.exports = utilSources;