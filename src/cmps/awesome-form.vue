<template>
  <GoogleMap api-key="AIzaSyBtz51KaasrXNvngDYG54KYeXypqqKTLJo" style="width: 100%; height: 500px" :center="center"
    :zoom="11">
    <Marker v-for="marker in markers" :options="marker" @click="center=marker.position"/>
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  components: { GoogleMap, Marker },
  data() {
    return {
      center: { lat: 32.189247, lng: 34.844502 },
      markers: {
        m1: {
          title: 'Natanya',
          position: { lat: 32.289247, lng: 34.844502 },
        },
        m2: {
          title: 'Tel Aviv',
          position: { lat: 32.089247, lng: 34.774502 },
        },
        m3: {
          title: 'Petach Tikva',
          position: { lat: 32.079247, lng: 34.874502 },
        },
        m4: {
          title: 'Kfar Saba',
          position: { lat: 32.179247, lng: 34.914502 },
        },
      }
    }
  },
}
</script>