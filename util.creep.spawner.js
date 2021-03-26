let utilCreepSpawner = {
  spawnCreep: function (spawn, role, name, body, size = 'small', targetRoom = null, memory = {}) {
    // If we're spawning a creep or there is no creep to spawn, return early.
    if (spawn.spawning) return
    let energy = spawn.room.energyCapacityAvailablenumber

    memory = {
      role: role,
      working: false
    }

    if(targetRoom !== null){
      memory = {
        role: role,
        working: false,
        targetRoom: targetRoom,
        spawnRoom: spawn.room.name,
      }
    }

    let response = spawn.spawnCreep(body, name + '_' + targetRoom, {
      memory: memory
    })

    console.log(response)
    return response
  },
}

module.exports = utilCreepSpawner
