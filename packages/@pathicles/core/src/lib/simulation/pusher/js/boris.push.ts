export default (q, m, dt, v, E, B) => {
  // function Boris(m, q, vel_x, vel_y, vel_z, dt, E[0], E[1], E[2], B[0], B[1], B[2])
  // -----------------------------------------------------------------------
  //   Input variables: m, q, vel_x, vel_y, vel_z, dt, E[0], E[1], E[2], B[0], B[1], B[2]
  //
  // m: mass of the macro particle
  //
  // q: charge of the macro particle
  //
  // vel_x, vel_y, vel_z: The input velocities in x, y, z
  //
  // dt: Time step in the PIC code
  //
  // E[0], E[1], E[2], B[0], B[1], B[2]: These are the interpolated fields E(x((n+1) * dt)), B(x((n+1) * dt)) used
  // to push v((n+1/2) * dt) to v((n+3/2) * dt)
  // -----------------------------------------------------------------------
  //   returns: vel_x_new, vel_y_new, vel_z_new
  //
  // vel_x_new, vel_y_new, vel_z_new: These are the updated velocity arrays from
  // v((n+1/2)*dt) to v((n+3/2)*dt)
  //

  const vel_x_minus = v[0] + (q * E[0] * dt) / (2 * m)
  const vel_y_minus = v[1] + (q * E[1] * dt) / (2 * m)
  const vel_z_minus = v[2] + (q * E[2] * dt) / (2 * m)

  const t_magx = (q * B[0] * dt) / (2 * m)
  const t_magy = (q * B[1] * dt) / (2 * m)
  const t_magz = (q * B[2] * dt) / (2 * m)

  const vminus_cross_t_x = vel_y_minus * t_magz - vel_z_minus * t_magy
  const vminus_cross_t_y = -(vel_x_minus * t_magz) + vel_z_minus * t_magx
  const vminus_cross_t_z = vel_x_minus * t_magy - vel_y_minus * t_magx

  const vel_dashx = vel_x_minus + vminus_cross_t_x
  const vel_dashy = vel_y_minus + vminus_cross_t_y
  const vel_dashz = vel_z_minus + vminus_cross_t_z

  const t_mag = Math.sqrt(t_magx ** 2 + t_magy ** 2 + t_magz ** 2)

  const s_x = (2 * t_magx) / (1 + Math.abs(t_mag ** 2))
  const s_y = (2 * t_magy) / (1 + Math.abs(t_mag ** 2))
  const s_z = (2 * t_magz) / (1 + Math.abs(t_mag ** 2))

  const vel_x_plus = vel_x_minus + (vel_dashy * s_z - vel_dashz * s_y)
  const vel_y_plus = vel_y_minus - (vel_dashx * s_z - vel_dashz * s_x)
  const vel_z_plus = vel_z_minus + (vel_dashx * s_y - vel_dashy * s_x)

  const vel_x_new = vel_x_plus + (q * E[0] * dt) / (2 * m)
  const vel_y_new = vel_y_plus + (q * E[1] * dt) / (2 * m)
  const vel_z_new = vel_z_plus + (q * E[2] * dt) / (2 * m)

  return [vel_x_new, vel_y_new, vel_z_new]
}
