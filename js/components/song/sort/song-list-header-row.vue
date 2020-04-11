<template>
  <tr>
    <th @click="$emit('sortByTrack')" class="track-number" data-test="sort-by-track">#
      <i class="fa fa-angle-down" v-show="is_sorting_by_track && reverse === false"></i>
      <i class="fa fa-angle-up" v-show="is_sorting_by_track && reverse === true"></i>
    </th>
    <th @click="$emit('sortByTitle')" class="title" data-test="sort-by-title">Title
      <i class="fa fa-angle-down" v-show="is_sorting_by_title && reverse === false"></i>
      <i class="fa fa-angle-up" v-show="is_sorting_by_title && reverse === true"></i>
    </th>
    <th @click="$emit('sortByArtist')" class="artist" data-test="sort-by-artist">Artist
      <i class="fa fa-angle-down" v-show="is_sorting_by_artist && reverse === false"></i>
      <i class="fa fa-angle-up" v-show="is_sorting_by_artist && reverse === true"></i>
    </th>
    <th @click="$emit('sortByAlbum')" class="album" data-test="sort-by-album">Album
      <i class="fa fa-angle-down" v-show="is_sorting_by_album && reverse === false"></i>
      <i class="fa fa-angle-up" v-show="is_sorting_by_album && reverse === true"></i>
    </th>
    <th @click="$emit('sortByTime')" class="time" data-test="sort-by-time">Time
      <i class="fa fa-angle-down" v-show="is_sorting_by_time && reverse === false"></i>
      <i class="fa fa-angle-up" v-show="is_sorting_by_time && reverse === true"></i>
    </th>
    <th class="play"></th>
  </tr>
</template>

<script>
export default {
  name: 'song-list-header-row',
  props: {
    sortKey: {
      type: Array,
      required: true
    },
    reverse: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    is_sorting_by_track () {
      return !this.is_sorting_by_artist &&
        !this.is_sorting_by_album &&
        this.sortKey.some(key => key === 'song.track')
    },
    is_sorting_by_title () {
      return this.sortKey[0] === 'song.title'
    },
    is_sorting_by_artist () {
      return this.sortKey[0] === 'song.album.artist.name'
    },
    is_sorting_by_album () {
      return this.sortKey[0] === 'song.album.name'
    },
    is_sorting_by_time () {
      return this.sortKey[0] === 'song.length'
    }
  }
}
</script>
