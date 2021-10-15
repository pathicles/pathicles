#pragma glslify: export(unpackFloat);
//float unpackFloat(vec4 a){float b,d,c,e;c=-step(128.,a.a),a.a+=128.*c,b=step(128.,a.b),a.b-=b*128.,b+=2.*a.a-127.,d=a.b*65536.+a.g*256.+a.r,e=c*exp2(b)*(1.+d*exp2(-23.));return e;}


float unpackFloat(vec4 texel) {
  float exponent;
  float mantissa;
  float sgn;
  float value;

  /* sgn will be 0 or -1 */
  sgn = -step(128.0, texel.a);
  texel.a += 128.0*sgn;

  exponent = step(128.0, texel.b);
  texel.b -= exponent*128.0;
  /* Multiple by 2 => left shift by one bit. */
  exponent += 2.0*texel.a -127.0;

  mantissa = texel.b*65536.0 + texel.g*256.0 + texel.r;

  value = sgn * exp2(exponent)*(1.0 + mantissa * exp2(-23.0));

  return value;
}

