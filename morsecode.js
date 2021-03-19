// Disable menu on right click
document.oncontextmenu = function() {
  return false;
}

// Map of morse code to english
const cache = {
  '.-'      : 'A',
  '-...'    : 'B',
  '-.-.'    : 'C',
  '-..'     : 'D',
  '.'       : 'E',
  '..-.'    : 'F',
  '--.'     : 'G',
  '....'    : 'H',
  '..'      : 'I',
  '.---'    : 'J',
  '-.-'     : 'K',
  '.-..'    : 'L',
  '--'      : 'M',
  '-.'      : 'N',
  '---'     : 'O',
  '.---.'   : 'P',
  '--.-'    : 'Q',
  '.-.'     : 'R',
  '...'     : 'S',
  '-'       : 'T',
  '..-'     : 'U',
  '...-'    : 'V',
  '.--'     : 'W',
  '-..-'    : 'X',
  '-.--'    : 'Y',
  '--..'    : 'Z',
  '.----'   : '1',
  '..---'   : '2',
  '...--'   : '3',
  '....-'   : '4',
  '.....'   : '5',
  '-....'   : '6',
  '--...'   : '7',
  '---..'   : '8',
  '----.'   : '9',
  '-----'   : '0',
  '|'       : ' '
};

// Convert morse code to english
let decodeMorseCode = function(code) {
  var normal = "";
  code.split(' ').forEach(e => normal += (cache[e] || ''));
  return normal;
}

var morseString = '';
var normalString = ' ';

// Mouse listener for user morse code input
document.addEventListener('mousedown', function(e) {
  if(e.buttons == 1) {
    morseString += '.'
  }else if(e.buttons == 2) {
    morseString += '-'
  }else if(e.buttons == 4) {
    morseString += " "
    normalString = decodeMorseCode(morseString);
    document.getElementById('normal').innerHTML = normalString;
  }

  document.getElementById('morsecode').innerHTML = morseString.replace(/\|/g, ' ');
});

// Mouse wheel to insert space
document.addEventListener('wheel', function(e) {
  if(e.deltaY > 200 && morseString.charAt(morseString.length-2) != '|') {
    morseString += '| '
    document.getElementById('morsecode').innerHTML = morseString.replace(/\|/g, ' ') + '|';
  }
});

// A help message that displays the morse code for a character if it is pressed while shift is held
document.addEventListener('keydown', function(e) {
  if(e.code == 'Space') {
    morseString = '';
    normalString = '';
    document.getElementById('normal').innerHTML = '';
    document.getElementById('morsecode').innerHTML = '';
    return;
  }

  let help = Object.keys(cache).find(key => cache[key] == e.code.replace(/Key/, ''));
  if(help != undefined && e.shiftKey) {
    alert("Help: " + help)
  }
});
