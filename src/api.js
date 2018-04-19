// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
fetch('https://itunes.apple.com/search?term=red+hot+chili+peppers&entity=song&limit=10').then((response) => {
    return response.json()
}).then((recurso) => {
    SongAPI.RHCP = recurso.results
})
const SongAPI = {
    RHCP: [],
    all: function () { return this.RHCP },
    get: function (id) {
        const isSong = p => p.trackId === id
        return this.RHCP.find(isSong)
    }
}
export default SongAPI



