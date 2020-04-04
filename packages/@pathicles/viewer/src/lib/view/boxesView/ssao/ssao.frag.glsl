precision mediump float;
highp float random(vec2 co)
{
  highp float a=12.9898;
  highp float b=78.233;
  highp float c=43758.5453;
  highp float dt=dot(co.xy,vec2(a,b));
  highp float sn=mod(dt,3.14);
  return fract(sin(sn)*c);
}
const int MAX_SAMPLE_COUNT=32;
uniform sampler2D positionBuffer,depthNormalBuffer;//, rotationsBuf;
uniform mat4 projection,view,iProj;
uniform vec2 hRotBuf;
uniform vec3 kernel[MAX_SAMPLE_COUNT];
uniform float radius,near,far;
varying vec2 uv;
float valueToDepth(float value){
  return -projection[3].z/(projection[2].z+2.*value-1.);
}
void main(){

  float occlusion=1.;

  vec4 depthNormal=texture2D(depthNormalBuffer,uv);
  vec4 position=texture2D(positionBuffer,uv);

  if(position.y>=-2.){
    vec3 samp;
    vec4 offset;
    vec3 normal=(view*vec4(depthNormal.yzw,0)).xyz;
    vec4 origin=iProj*vec4(2.*uv-1.,-1.+2.*depthNormal.x,1.);

    origin/=origin.w;
    // //vec4 rotSample = texture2D(rotationsBuf, uv * hRotBuf);
    vec2 rotSample=normalize(vec2(
        random(gl_FragCoord.xy*hRotBuf)*2.-1.,
        random((gl_FragCoord.xy+vec2(.5))*hRotBuf)*2.-1.)
      );
      vec3 rotation=vec3(rotSample.xy,0.);
      vec3 tangent=normalize(rotation-normal*dot(rotation,normal));
      mat3 tbn=mat3(tangent,cross(normal,tangent),normal);
      float sampleDepth,rangeCheck;

      float ddist,ddist2;
      for(int i=0;i<MAX_SAMPLE_COUNT;i++){
        samp=origin.xyz+radius*tbn*kernel[i];
        offset=projection*vec4(samp,1.);
        offset.xy/=offset.w;
        offset.xy=offset.xy*.5+.5;
        sampleDepth=valueToDepth(texture2D(depthNormalBuffer,offset.xy).x);
        ddist=abs(origin.z-sampleDepth)*.5/radius;
        occlusion+=(sampleDepth>=samp.z?1.:0.)/(1.+ddist*ddist);
      }
      occlusion=1.-(occlusion/float(MAX_SAMPLE_COUNT));
    }
    gl_FragColor=vec4(vec3(occlusion),depthNormal.x);
  }

