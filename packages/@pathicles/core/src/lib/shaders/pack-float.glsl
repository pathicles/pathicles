#pragma glslify: export(packFloat);

vec4 packFloat(float d){if(d==0.)return vec4(0,0,0,0);vec4 a;float b,c,f;f=step(0.,-d),d=abs(d),b=floor(log2(d)),c=d*pow(2.,-b)-1.,b=b+127.,a=vec4(0,0,0,0),a.a=floor(b/2.),b=b-a.a*2.,a.a=a.a+128.*f,a.b=floor(c*128.),c=c-a.b/128.,a.b=a.b+b*128.,a.g=floor(c*32768.),c=c-a.g/32768.,a.r=floor(c*8388608.);return a/255.;}
