<template>
  <div class="station elevation-5" :style="{backgroundImage: 'url(' + image + ')'}">
    <div class="station__name caption">
      Station Name
    </div>
  </div>
</template>

<script>
export default {
  name: 'Station',
  data: () => ({
    image: "https://img.youtube.com/vi/hHW1oY26kxQ/sddefault.jpg"
  })
}

</script>

<style scoped lang='scss'>
.station {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-size: 250px 210px;
  background-position: 50% 50%;
  border: 3px solid white;
  position: relative;

  &__name {
    position: absolute;
    bottom: -28px;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
  }
}
</style>