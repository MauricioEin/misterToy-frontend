

<template>
    <h1>LIST CONTAINER</h1>

    <section class="toy-list-container">
        
        <ul class="toy-list clean-list ">
                <li v-for="toy in toys">
                    <toy-preview :toy="toy" 
                        :key="toy._id" 
                        @toggleToyState="$emit('toggleToyState', $event)"
                        @removeToy="$emit('removeToy',$event)">
                    </toy-preview>
                </li>
            </ul>
        </section>
</template>
<script>
import toyPreview from './toy-preview.cmp.vue';

    export default {
        props:['toys'],
        computed:{
            // getUser(){
            //     return this.$store.getters.getUser
            // }
        },
        components:{
            toyPreview
        }
    }
</script>