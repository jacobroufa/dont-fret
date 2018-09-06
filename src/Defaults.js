export const keys = [ "C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B" ];

export const modes = [ "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian" ];

export const instruments = {
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

export const FRET_WIDTH = 40;
export const STRING_WIDTH = 2;

export const LEFT_MARGIN = 20;

export const FRET_SIZE = 3;
export const NUT_SIZE = 6;

// taken from https://www.liutaiomottola.com/formulae/fret.htm
export const FRET_CONSTANT = [
	0.056126,
	0.109101,
	0.159104,
	0.206291,
	0.250847,
	0.292893,
	0.33258,
	0.370039,
	0.405396,
	0.438769,
	0.470268,
	0.5,
	0.528063,
	0.554551,
	0.579552,
	0.60315,
	0.625423,
	0.646447,
	0.66629,
	0.68502,
	0.702698,
	0.719385,
	0.735134,
	0.75
];
