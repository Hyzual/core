import each from "jest-each"
import { shallowMount } from "@vue/test-utils"
import SongListHeaderRow from "@/components/song/sort/song-list-header-row.vue"

describe(`components/song/sort/song-list-header`, () => {
  each([[false, "angle-down"], [true, "angle-up"]]).test(
    `when sortKey contains 'song.track' and reverse is %p,
    it will show the %s icon`,
    (reverse, icon_name) => {
      const wrapper = createWrapper(["song.disc", "song.track"], reverse)
      const icon = wrapper.find("[data-test=sort-by-track] > .fa-" + icon_name)
      expect(icon.isVisible()).toBe(true)
    }
  )

  each([[false, "angle-down"], [true, "angle-up"]]).test(
    `when sortKey starts with 'song.title' and reverse is %p,
    it will show the %s icon`,
    (reverse, icon_name) => {
      const wrapper = createWrapper(["song.title"], reverse)
      const icon = wrapper.find("[data-test=sort-by-title] > .fa-" + icon_name)
      expect(icon.isVisible()).toBe(true)
    }
  )

  each([[false, "angle-down"], [true, "angle-up"]]).test(
    `when sortKey starts with 'song.album.artist.name' and reverse is %p,
    it will show the %s icon`,
    (reverse, icon_name) => {
      const wrapper = createWrapper(
        ["song.album.artist.name", "song.album.name", "song.track"],
        reverse
      )
      const icon = wrapper.find(
        "[data-test=sort-by-artist] > .fa-" + icon_name
      )
      expect(icon.isVisible()).toBe(true)
    }
  )

  each([[false, "angle-down"], [true, "angle-up"]]).test(
    `when sortKey starts with 'song.album.name' and reverse is %p,
    it will show the %s icon`,
    (reverse, icon_name) => {
      const wrapper = createWrapper(["song.album.name", "song.track"], reverse)
      const icon = wrapper.find("[data-test=sort-by-album] > .fa-" + icon_name)
      expect(icon.isVisible()).toBe(true)
    }
  )

  each([[false, "angle-down"], [true, "angle-up"]]).test(
    `when sortKey starts with 'song.length' and reverse is %p,
    it will show the %s icon`,
    (reverse, icon_name) => {
      const wrapper = createWrapper(["song.length"], reverse)
      const icon = wrapper.find("[data-test=sort-by-time] > .fa-" + icon_name)
      expect(icon.isVisible()).toBe(true)
    }
  )

  describe(`sort on click`, () => {
    each([
      ["Track number", "sortByTrack", "[data-test=sort-by-track]"],
      ["Title", "sortByTitle", "[data-test=sort-by-title]"],
      ["Artist", "sortByArtist", "[data-test=sort-by-artist]"],
      ["Album", "sortByAlbum", "[data-test=sort-by-album]"],
      ["Time", "sortByTime", "[data-test=sort-by-time]"]
    ]).test(
      `when I click on the %s header, it will emit '%s'`,
      (header_name, event_name, selector) => {
        const wrapper = createWrapper(["song.title"], false)
        wrapper.find(selector).trigger("click")
        expect(wrapper.emitted(event_name)).toBeTruthy()
      }
    )
  })
})

function createWrapper (sortKey, reverse) {
  return shallowMount(SongListHeaderRow, {
    propsData: {
      sortKey,
      reverse
    }
  })
}
