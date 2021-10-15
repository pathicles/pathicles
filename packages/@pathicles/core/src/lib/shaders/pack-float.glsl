#pragma glslify: export(packFloat);
//
//vec4 packFloat(float d){if(d==0.)return vec4(0,0,0,0);vec4 a;float b,c,f;f=step(0.,-d),d=abs(d),b=floor(log2(d)),c=d*pow(2.,-b)-1.,b=b+127.,a=vec4(0,0,0,0),a.a=floor(b/2.),b=b-a.a*2.,a.a=a.a+128.*f,a.b=floor(c*128.),c=c-a.b/128.,a.b=a.b+b*128.,a.g=floor(c*32768.),c=c-a.g/32768.,a.r=floor(c*8388608.);return a/255.;}

vec4 packFloat(float value) {
  if (value == 0.0) return vec4(0, 0, 0, 0);

  float exponent;
  float mantissa;
  vec4  result;
  float sgn;

  sgn = step(0.0, -value);
  value = abs(value);

  exponent =  floor(log2(value));

  mantissa =  value*pow(2.0, -exponent)-1.0;
  exponent =  exponent+127.0;
  result   = vec4(0,0,0,0);

  result.a = floor(exponent/2.0);
  exponent = exponent - result.a*2.0;
  result.a = result.a + 128.0*sgn;

  result.b = floor(mantissa * 128.0);
  mantissa = mantissa - result.b / 128.0;
  result.b = result.b + exponent*128.0;

  result.g =  floor(mantissa*32768.0);
  mantissa = mantissa - result.g/32768.0;

  result.r = floor(mantissa*8388608.0);

  return result/255.0;
}
