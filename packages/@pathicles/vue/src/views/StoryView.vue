<template lang="pug">
  div
    pathicles-story(:story="story")
</template>

<script>
import PathiclesStory from './../components/PathiclesStory'
export default {
  components: { 'pathicles-story': PathiclesStory },
  data() {
    return {
      story: {
        scenes: [
          {
            type: 'caption',
            title: '<strong>Wir&nbsp;beschleunigen</strong>',
            subtitle_1_1:
              '<strong>Teilchen</strong> in&nbsp;unseren&nbsp;Berufen',
            subtitle_1_2:
              '<strong>und die Beschleunigerphysik</strong> im Berufsverband.',
            image: '/images/story/story-electric.jpg',
            pathicles: {
              preset: 'story-loop',
              data: 'story-electric.json',
              camera: {
                position: [-1, 1.5, 1],
                target: [2, 1.5, -2]
              }
            }
          },
          {
            type: 'caption',
            title: 'Beschleunigung<br><strong>macht&nbsp;schneller</strong>.',
            body:
              'Elektrische Kräfte wirken sich auf Photonen, Elektronen und Protonen verschieden aus: Masselose <span class="photon">Photonen</span> sind immer mit Lichtgeschwindigkeit unterwegs, daran ändert auch eine Kraft nichts.  <span class="electron">Elektronen</span> werden rasch auf Fast-Lichtgeschwindigkeit beschleunigt, erreichen diese aber nie ganz. <span class="proton">Protonen</span> sind schwerer und brauchen etwas länger, um in Fahrt zu kommen.\n',
            image: '/images/story/story-electric.jpg',
            scene_index: 1,
            pathicles: {
              preset: 'story-electric',
              data: 'story-electric.json',
              camera: {
                position: [-2, 1.5, 0],
                target: [0, 1.5, 0]
              }
            }
          },
          {
            type: 'caption',
            title:
              'Beschleunigung<br><strong>hält&nbsp;auf&nbsp;Spur</strong>.',
            scene_index: 2,
            body:
              'Magnetfelder wirken senkrecht zur Geschwindigkeit geladener Teilchen, die dadurch ihre Richtung ändern. Gleichförmige Magnetfelder führen zu einer Kreisbahn und kommen etwa in Ringbeschleunigern zum Einsatz.\n',
            image: '/images/story/story-dipole.jpg',
            pathicles: {
              preset: 'story-dipole',
              data: 'story-dipole.json',
              camera: {
                position: [2, 1.5, 2],
                target: [0, 1.5, 0]
              }
            }
          },
          {
            type: 'caption',
            title: 'Beschleunigung<br><strong>schafft Zusammenhalt</strong>.',
            scene_index: 3,
            body:
              'Magnetfelder, deren Stärke mit Abstand zur optimalen Teilchenbahn zunimmt, wirken wie optische Linsen: In einer Ebene bringen sie die Teilchen zusammen, in der dazu senkrechten Ebene jedoch auseinander. In modernen Beschleunigern sorgen hunderte solcher Bündelungsmagnete für den Zusammenhalt.\n',
            image: '/images/story/story-quadrupole.jpg',
            pathicles: {
              preset: 'story-quadrupole',
              data: 'story-quadrupole.json',
              camera: {
                position: [2, 1.5, 2],
                target: [0, 1.5, 0]
              }
            }
          },
          {
            type: 'options',
            pathicles: {
              preset: 'story-empty',
              camera: {
                position: [1, 5, 0],
                target: [-1, 0, 0]
              }
            }
          }
        ]
      }
    }
  }
}
</script>
