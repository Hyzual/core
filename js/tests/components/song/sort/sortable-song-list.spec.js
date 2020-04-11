import each from "jest-each"
import { shallowMount } from "@vue/test-utils"
import SortableSongList from "@/components/song/sort/sortable-song-list.vue"
import SongListHeaderRow from "@/components/song/sort/song-list-header-row.vue"
import * as filters from "@/utils/filters.js"
import factory from "@/tests/factory"

describe(`components/song/sort/sortable-song-list`, () => {
  let orderBy, songs
  beforeEach(() => {
    orderBy = jest.spyOn(filters, "orderBy")
    songs = factory("song", 20)
  })

  it(`when type is 'album', it will sort first by disk number,
    then by track number, in ascending order by default`, () => {
    const wrapper = createWrapper(songs, "album")

    const header_wrapper = wrapper.find(SongListHeaderRow)
    expect(header_wrapper.props("sortKey")).toEqual([
      "song.disc",
      "song.track"
    ])
    expect(header_wrapper.props("reverse")).toBe(false)
  })

  it(`when type is not 'album', it will not sort by anything by default`, () => {
    const wrapper = createWrapper(songs, "all-songs")

    const header_wrapper = wrapper.find(SongListHeaderRow)
    expect(header_wrapper.props("sortKey")).toEqual([])
    expect(header_wrapper.props("reverse")).toBe(false)
  })

  it(`when the header emits 'sortByTrack' and type is 'album',
    it will sort first by disk number, then by track number and reverse order`, () => {
    const wrapper = createWrapper(songs, "album")

    const header_wrapper = wrapper.find(SongListHeaderRow)
    header_wrapper.vm.$emit("sortByTrack")
    expect(header_wrapper.props("sortKey")).toEqual([
      "song.disc",
      "song.track"
    ])
    expect(header_wrapper.props("reverse")).toBe(true)
    expect(orderBy).toHaveBeenCalled()
  })

  each([
    ["sortByTrack", "track number", ["song.track"]],
    ["sortByTitle", "song title", ["song.title"]],
    [
      "sortByArtist",
      "artist name, album name and song track number",
      ["song.album.artist.name", "song.album.name", "song.track"]
    ],
    [
      "sortByAlbum",
      "album name and song track number",
      ["song.album.name", "song.track"]
    ],
    ["sortByTime", "song length", ["song.length"]]
  ]).test(
    `when the header emits '%s',
    it will sort song wrappers by %s and reverse order`,
    (event_name, title, sortKey) => {
      const wrapper = createWrapper(songs, "all-songs")

      const header_wrapper = wrapper.find(SongListHeaderRow)
      header_wrapper.vm.$emit(event_name)
      expect(header_wrapper.props("sortKey")).toEqual(sortKey)
      expect(header_wrapper.props("reverse")).toBe(true)
      expect(orderBy).toHaveBeenCalledWith(songs, sortKey, -1)
    }
  )
})

function createWrapper (filtered_song_rows, type) {
  return shallowMount(SortableSongList, {
    propsData: {
      filtered_song_rows,
      type
    }
  })
}
