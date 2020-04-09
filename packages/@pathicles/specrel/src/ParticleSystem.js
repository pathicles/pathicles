import Specrel, { bigNumberMath, format6 } from "./Specrel";
import {
  FieldTypes,
  MagneticConstantField,
  ElectricConstantField
} from "./ForceField";
import ParticleCollection from "./ParticleCollection";
import ParticleTypes from "./ParticleTypes";
import * as d3 from "d3";

export class ParticleSystem {
  constructor(particleCollection, stepHistoryLength) {
    if (!particleCollection) {
      throw "The constructor of class System has a wmandatory argument";
    }
    this._particleCollectionHistory = new Array();

    this.particleCollection = particleCollection;

    this._fields = [];
    this._t0 = 0;
  }

  get particleCollection() {
    return this._particleCollectionHistory[
      this._particleCollectionHistory.length - 1
    ];
  }

  set particleCollection(particleCollection) {
    this._particleCollectionHistory.push(particleCollection);
  }

  get fields() {
    return this._fields;
  }

  get particles() {
    return this.particleCollection.particles;
  }

  get particleData() {
    return this._particleCollectionHistory.map((step, s) => {
      return {
        ct: Specrel.speedOfLight__ms_1.times(s * this.dt__s).toNumber(),
        x__m: step.particles[0]._position__m[0].toNumber(),
        y__m: step.particles[0]._position__m[1].toNumber(),
        z__m: step.particles[0]._position__m[2].toNumber(),
        vx__c: step.particles[0].velocity__c[0].toNumber(),
        vy__c: step.particles[0].velocity__c[0].toNumber(),
        vz__c: step.particles[0].velocity__c[2].toNumber()
      };
    });
  }

  get positionData() {
    return this._particleCollectionHistory.reduce((sum, step, s) => {
      return sum.concat([
        step._particles[0]._position__m[0].toNumber(),
        step._particles[0]._position__m[1].toNumber(),
        step._particles[0]._position__m[2].toNumber(),
        Specrel.speedOfLight__ms_1.times(s * this.dt__s).toNumber()
      ]);
    }, []);
  }

  get velocityData() {
    return this._particleCollectionHistory.reduce((sum, step, s) => {
      return sum.concat([
        step._particles[0].velocity__c[0].toNumber(),
        step._particles[0].velocity__c[1].toNumber(),
        step._particles[0].velocity__c[2].toNumber(),
        Specrel.speedOfLight__ms_1.times(s * this.dt__s).toNumber()
      ]);
    }, []);
  }

  addField(field) {
    this._fields.push(field);
  }

  ffieldValue(location) {
    return {
      B__T: new Float32Array([0, 1, 0]),
      E__Vm_1: new Float32Array([0, 0, 0])
    };
  }

  fieldValue(location__m) {
    // const location__m = location.map(i => i.to("m").toNumber())

    const B__T = [0, 0, 0];
    const E__Vm_1 = [0, 0, 0];

    this.fields.forEach(field => {
      const value = field.value(location__m);

      if (value[FieldTypes.MAGNETIC]) {
        B__T[0] += value[FieldTypes.MAGNETIC][0];
        B__T[1] += value[FieldTypes.MAGNETIC][1];
        B__T[2] += value[FieldTypes.MAGNETIC][2];
      }
      if (value[FieldTypes.ELECTRIC]) {
        E__Vm_1[0] += value[FieldTypes.ELECTRIC][0];
        E__Vm_1[1] += value[FieldTypes.ELECTRIC][1];
        E__Vm_1[2] += value[FieldTypes.ELECTRIC][2];
      }
    });

    return {
      B__T,
      B: B__T.map(value => bigNumberMath.unit(value, "T")),
      E__Vm_1,
      E: E__Vm_1.map(value => bigNumberMath.unit(value, "V / m"))
    };
  }

  getBoundingBox() {
    const particleData = this.particleData;

    const [xMin, xMax] = d3.extent(particleData.map(p => p.x__m));
    const xWidth = xMax - xMin;
    const [yMin, yMax] = d3.extent(particleData.map(p => p.y__m));
    const yWidth = yMax - yMin;
    const [zMin, zMax] = d3.extent(particleData.map(p => p.z__m));
    const zWidth = zMax - zMin;

    return {
      x: { min: xMin, max: xMax, width: xWidth },
      y: { min: yMin, max: yMax, width: yWidth },
      z: { min: zMin, max: zMax, width: zWidth }
    };
  }

  toString() {
    const steps = this._particleCollectionHistory.map((step, s) => {
      return (
        `step ${s}: ` +
        step.particles.map((particle, p) => {
          return `   \nparticle ${p}: ` + particle.toString();
        })
      );
    });

    return steps.join("\n");
  }

  toData() {
    return this._particleCollectionHistory.map((step, s) => {
      return {
        stepId: s,
        particles: step.particles.map((particle, p) => {
          return {
            particleId: p,
            ...particle.getVariableData()
          };
        })
      };
    });
  }

  positionsToString() {
    const particlePositions = this._particleCollectionHistory.map((step, s) => {
      return step.particles.map((particle, p) => {
        return format6(particle._position__m);
      });
    });

    return particlePositions.join("\n");
  }
}

ParticleSystem.load = function({
  particleCount = 1,
  particleType = "ELECTRON",
  bunchShape = "SQUARE",
  particleSeparation = 0,
  gamma = 1,
  emitterDirection = [0, 0, 1],
  relativeEmitterDirectionJitter = [0, 0, 0],
  stepHistoryLength = 10,
  dipole_strength = 0,
  electricFieldStrength = 0
}) {
  const pCollection = ParticleCollection.create({
    particleCount: particleCount,
    particleTypeDistribution: particleType
      .trim()
      .split(/\s+/)
      .map(d => {
        return ParticleTypes.byName(d);
      })
  });
  pCollection.distributeLocation({
    bunchShape: bunchShape,
    dx: particleSeparation
  });
  pCollection.setMomentaFromGamma({
    gamma: gamma,
    direction: emitterDirection,
    relativeEmitterDirectionJitter: relativeEmitterDirectionJitter
  });

  const particleSystem = new ParticleSystem(pCollection, stepHistoryLength);

  const dipoleField = new MagneticConstantField({
    minLocation: [-100, -100, -100],
    maxLocation: [100, 100, 100],
    fieldValue: [0, dipole_strength || 0, 0]
  });

  particleSystem.addField(dipoleField);

  const electricField = new ElectricConstantField({
    minLocation: [-100, -100, -100],
    maxLocation: [100, 100, 100],
    fieldValue: [0, 0, electricFieldStrength || 0]
  });

  particleSystem.addField(electricField);

  return particleSystem;
};
