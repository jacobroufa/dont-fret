export const keys = [ "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B" ];

export const modes = [ "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian" ];

export const presets = {
	bass: {
		strings: 4,
		frets: 20,
		notes: [ "G", "D", "A", "E" ]
	},
	guitar: {
		strings: 6,
		frets: 24,
		notes: [ "E", "B", "G", "D", "A", "E" ]
	},
	mandolin: {
		strings: 4,
		frets: 22,
		notes: [ "E", "A", "D", "G" ],
		octave: true
	}
};
