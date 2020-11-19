#pragma glslify: export(unpackFloat);
float unpackFloat(vec4 a){float b,d,c,e;c=-step(128.,a.a),a.a+=128.*c,b=step(128.,a.b),a.b-=b*128.,b+=2.*a.a-127.,d=a.b*65536.+a.g*256.+a.r,e=c*exp2(b)*(1.+d*exp2(-23.));return e;}


