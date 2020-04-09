import ParticleTypes, {ParticleTypesList} from './ParticleTypes'


test("count is 4",
  () => {

    expect(ParticleTypesList.length).toBe(4)
  })

test("names",
  () => {

    expect(ParticleTypes.PHOTON.name).toBe("PHOTON")
    expect(ParticleTypes.ELECTRON.name).toBe("ELECTRON")
    expect(ParticleTypes.POSITRON.name).toBe("POSITRON")
    expect(ParticleTypes.PROTON.name).toBe("PROTON")
  }
)

test("by name",
  () => {

    const Proton = ParticleTypes.byName("PROTON")
    expect(Proton.name).toBe("PROTON")
  }
)

test("id by name",
  () => {


    expect(ParticleTypes.idByName("PHOTON")).toBe(0)
    expect(ParticleTypes.idByName("ELECTRON")).toBe(1)
    expect(ParticleTypes.idByName("POSITRON")).toBe(2)
    expect(ParticleTypes.idByName("PROTON")).toBe(3)
    expect(ParticleTypes.idByName("PROTON2")).toBe(-1)
  }
)




