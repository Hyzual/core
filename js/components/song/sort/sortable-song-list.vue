<template>
  <div>
    <table class="song-list-header sortable">
      <thead>
        <song-list-header-row
          :sort-key="sortKey"
          :reverse="reverse"
          @sortByTrack="sortByTrack()"
          @sortByTitle="sortByTitle()"
          @sortByArtist="sortByArtist()"
          @sortByAlbum="sortByAlbum()"
          @sortByTime="sortByTime()"
        />
      </thead>
    </table>
    <virtual-scroller
      class="scroller"
      content-tag="table"
      :items="sorted_song_rows"
      item-height="35"
      :renderers="renderers"
      key-field="song.id"
    />
  </div>
</template>

<script>
import { orderBy } from "@/utils"
import SongListHeaderRow from "./song-list-header-row.vue"
const SongItem = () => import("../item.vue")

export default {
  name: "sortable-song-list",
  components: {
    SongListHeaderRow,
    SongItem
  },
  props: {
    filtered_song_rows: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      renderers: Object.freeze({
        song: SongItem
      }),
      sortKey: this.type === "album" ? ["song.disc", "song.track"] : [],
      reverse: false
    }
  },

  computed: {
    sorted_song_rows () {
      const order = this.reverse ? -1 : 1
      return orderBy(this.filtered_song_rows, this.sortKey, order)
    }
  },

  methods: {
    reverseOrder () {
      this.reverse = !this.reverse
    },

    sortByTrack () {
      this.sortKey =
        this.type === "album" ? ["song.disc", "song.track"] : ["song.track"]
      this.reverseOrder()
    },

    sortByTitle () {
      this.sortKey = ["song.title"]
      this.reverseOrder()
    },

    sortByArtist () {
      this.sortKey = [
        "song.album.artist.name",
        "song.album.name",
        "song.track"
      ]
      this.reverseOrder()
    },

    sortByAlbum () {
      this.sortKey = ["song.album.name", "song.track"]
      this.reverseOrder()
    },

    sortByTime () {
      this.sortKey = ["song.length"]
      this.reverseOrder()
    }
  }
}
</script>
