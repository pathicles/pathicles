If you have ever had to visualise particle acceleration in an instructive, numerically accurate and visually appealing way that is also accessible as a still image on paper, a moving picture on screen or an interactive experience on smartphones and desktop computers, your options have been limited. With Pathicles, there might be a solution for you.

A **pathicle** is the visualization of the motion of a particle by sampling this trajectory in equidistant time steps. **Pathicles** is an open source project for creating those pathicles in a web browser by unleashing the parallel computational power of the available graphics processing unit in your device to solve the relativistic equations of motion numerically.

## Screenshots

### Free electrons

![free-electrons.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/free-electrons.jpg)

Without any magnetic or electric fields, electrons follow a straight path. Here,

### Spiraling electrons in a homogeneous static magnetic field

![spiral.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/spiral.jpg)

### Deflection of electrons in a magnetic dipole field

![story-dipole.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/story-dipole.jpg)

In accelerators, dipole magnets are used for deflecting beams.

### Particles in a homogeneous static electric field

![story-electric.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/story-electric.jpg)

While charged particles lose or gain velocity due to electrical forces, photons do not care at all.

### Proton beam collimation by alternating quadrupole fields

![story-quadrupole.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/story-quadrupole.jpg)

### Particle propagation at different Lorentz factors

![Different gammas](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/different-gammas.jpg)

### Pathicles logo

![pathicles-logo.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/pathicles-logo.jpg)

The pathicles logo shows photon, electron, and proton pathicles

### Photon beam

![free-photons.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/free-photons.jpg)

Not only for enlightening students, Pathicles has photon beams included.

### Random particles in a field-free box

![random.jpg](https://raw.githubusercontent.com/pathicles/pathicles/main/screenshots/random.jpg)

## Versions

### 0.1.0

- Vue 3 support

### 0.10.0

- mobile support
- js-based pusher
- image prerendering
- field visualization
- lattice rendering

## Roadmap

- more test cases
- geometric ambient occlusion
- better shadows
- using OGL instead of regl? / How about WebGL 2
- fields
  - dynamic external field
  - particle-in-cell for internal field
- Pathicles - the game
