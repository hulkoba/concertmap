const isSongFromInterpret = (songTitle, artist) => {
	const foundInterpret = songTitle.split('-')[0];
	return foundInterpret.trim().toLowerCase() === artist.trim().toLowerCase();
}

const titleHasSeparator = (song) => {
	return song.title.includes(' - ');
}

export function getMatchedSong(songs, artist) {
	return songs.filter(titleHasSeparator).find((song) => {
		if (isSongFromInterpret(song.title, artist)) {
			return song;
		}
	});
}
