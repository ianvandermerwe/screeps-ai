var utilMovements = {
  moveToClosest: function (creep,object) {
    // console.log(creep.room.find(object)[0])
    if (object.length > 0) {

    }
    return creep.moveTo(creep.room.find(object)[0],{visualizePathStyle: {stroke: '#ffffff'}})
  }
};

module.exports = utilMovements;
