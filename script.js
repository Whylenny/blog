var debug = false;
if (debug) {
  console.log("start");
}
var ansx = "BCDEFGHIJKLMNOPQRSTUVWXYZA";
var quex = "BCDEFGHIJKLMNOPQRSTUVWXYZA";
var quest = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var hints = [];
var test,
  tests = [],
  quests = [],
  guess,
  guesses = [],
  from,
  to,
  front,
  back,
  mix = [],
  beta = [],
  workText,
  sizer,
  tauthor,
  quotes = [],
  l,
  ll;
var starty = true;
var notDone = true;

function giveUp() {
  guesses = tests;
  displayIt();
}

function keyLine() {
  let i = alpha.indexOf(to);
  if (i == 0) {
    front = "";
  } // end if 0
  else {
    front = quex.substring(0, i);
  } // end else 0
  if (i == quex.length - 1) {
    back = "";
  } // end if end
  else {
    back = quex.substring(i + 1);
  } // end else end
  quex = front + from + back;
} // end keyline

function scramble() {
  mix = [];
  for (var i = 0; i < alpha.length; i++) {
    var mixer = Math.floor(Math.random() * 26);
    if (mix.includes(mixer) || mixer == i) {
      i--;
    } // end if
    else {
      mix[i] = mixer;
      beta[i] = alpha.charAt(i);
      var j = beta.indexOf(alpha.charAt(i));
      hints[i] = beta[mix[j]];
    } // end else
  } // end for
} // end scramble

function hint() {
  let h = Math.floor(Math.random() * 26);
  var hinter = hints[h] + "=>" + alpha[h];
  document.getElementById("hinter").innerText = hinter;
  document.getElementById("from").focus();
}

function build() {
  //console.log("build");
  document.getElementById("done").style.display = "none";

  ll = 38;
  tests = [];
  var k = 0;
  var stopit = test.length - ll;
  for (var i = 0; i < test.length; i += ll) {
    workText = test.substr(i, ll);
    if (i < stopit) {
      for (l = ll - 1; l > 0; l--) {
        if (workText.charAt(l) == " ") {
          break;
        } // end if blank
        else {
          i--;
        } // end else blank
      } // end for l
    } // end stopit
    else {
      l = ll;
    } // end else stopit
    tests[k] = workText.substr(0, l);
    k++;
  } // end for m
  tests[k] = "-" + tauthor;

  return k;
} // end build

function encode() {
  guesses = [];
  quests = [];
  for (var h = 0; h <= sizer; h++) {
    guess = "";
    quest = "";
    for (var i = 0; i <= tests[h].length; i++) {
      var j = beta.indexOf(tests[h].charAt(i));
      if (j == -1) {
        quest += tests[h].charAt(i);
        guess += tests[h].charAt(i);
      } // if
      else {
        quest += beta[mix[j]];
        guess += ".";
      } // else
    } // end for i
    guesses[h] = guess;
    quests[h] = quest;
  } // end for h
} // end encode

function displayIt() {
  if (debug) {
    console.log("disp");
  }
  document.getElementById("parent").innerHTML = "";
  var output = "";
  for (var i = 0; i <= sizer; i++) {
    output += "<span class='blue'>" + guesses[i] + "</span><br>";
    if (notDone) {
      output += "<span class='red'>" + quests[i] + "</span><br>";
    } // end if not done
  } // end for
  document.getElementById("parent").innerHTML = output;
  let answerKey = "";
  answerKey = "<span class='blue'>" + ansx + "</span><br>";
  answerKey += "<span class='red'>" + alpha + "</span><br>";
  let questKey = "<span class='red'>" + quex + "</span><br>";
  questKey += "<span class='blue'>" + alpha + "</span><br>";
  if (notDone) {
    document.getElementById("key1").innerHTML = answerKey;
    document.getElementById("key").innerHTML = questKey;
  } // end if not done
  else {
    document.getElementById("key1").innerHTML = "";
    document.getElementById("key").innerHTML = "";
  }
} // end displayIt

function newGame() {
  ansx = "..........................";
  quex = "..........................";
  if (debug) {
    console.log("new");
  }
  scramble();
  if (debug) {
    console.log("scramble");
  }
  //  test = document.getElementById("test").value;
  getQuote();
  if (debug) {
    console.log(test);
  }
  test = test.toUpperCase();
  tauthor = tauthor.toUpperCase();
  if (debug) {
    console.log(test.length, tauthor);
  }
  notDone = true;
  sizer = build();
  if (debug) {
    console.log("built");
  }
  encode();
  if (debug) {
    console.log("coded");
  }
  displayIt();
  document.getElementById("from").focus();
} // end newgame

function screenIt() {
  document.getElementById("from").value = "";
  document.getElementById("to").value = "";
  document.getElementById("from").focus();
}

function decode() {
  if (debug) {
    console.log("decode");
  }
  to = document.getElementById("to").value;
  if (to.length == 0) {
    document.getElementById("from").value = "";
    document.getElementById("from").focus();
    if (debug) {
      console.log("empty");
    }
    return;
  } // end if 0
  to = to.toUpperCase();
  var x = alpha.indexOf(to);
  if (x == -1) {
    if (debug) {
      console.log("minus");
    }
    return;
  } // end if -1

  screenIt();
  if (debug) {
    console.log(quests.length, guesses.length);
  }

  for (var m = 0; m < quests.length; m++) {
    quest = quests[m];
    guess = guesses[m];
    if (debug) {
      console.log(quest, guess);
    }
    oneLine();
    guesses[m] = guess;
  } // end for
  quest = alpha;
  guess = ansx;
  oneLine();
  ansx = guess;
  check();
  if (debug) {
    console.log(notDone);
  }
  keyLine();
  displayIt();
} // end function decode

function oneLine() {
  for (var i = 0; i < guess.length; i++) {
    if (to == guess.charAt(i)) {
      if (i == 0) {
        front = "";
      } // end if 0
      else {
        front = guess.substring(0, i);
      } // end else 0
      if (i == guess.length - 1) {
        back = "";
      } // end if end
      else {
        back = guess.substring(i + 1);
      } // end else end
      guess = front + "." + back;
    } // end if ==
  } // end for i
  for (var i = 0; i < quest.length; i++) {
    //console.log(i, quest.charAt(i));
    if (from == quest.charAt(i)) {
      if (i == 0) {
        front = "";
      } // end if 0
      else {
        front = guess.substring(0, i);
      } // end else 0
      if (i == quest.length - 1) {
        back = "";
      } // end if end
      else {
        back = guess.substring(i + 1);
      } // end else end
      guess = front + to + back;
    } // end if ==
  } // end for i
} // end oneline

function adv() {
  from = document.getElementById("from").value;
  if (from.length == 0) {
    return;
  } // end if 0
  from = from.toUpperCase();
  var x = alpha.indexOf(from);
  if (x == -1) {
    return;
  } // end if -1
  document.getElementById("to").focus();
} // end adv

function check() {
  if (debug) {
    console.log(guesses.length, tests.length);
  }
  if (guesses.length > tests.length) {
    console.log(guesses.pop());
  }

  for (var i = 0; i < guesses.length; i++) {
    if (debug) {
      console.log(guesses[i]);
      console.log(tests[i]);
    }
    if (guesses[i] != tests[i]) {
      if (debug) {
        console.log("i", i);
      }
      return;
    }
  } // end if
  // end for
  notDone = false;
  if (debug) {
    console.log("checkout");
  }
  document.getElementById("done").style.display = "block";
} // end check

function getQuote() {
  if (starty) {
    starty = false;
    getQuotes();
  } // end if no quotes
  if (debug) {
    console.log("getq", quotes.length);
  }
  var i = Math.floor(Math.random() * quotes.length);
  document.getElementById("hinter").innerText = i;
  test = quotes[i].text;
  tauthor = quotes[i].author;
  if (tauthor == "null") {
    tauthor = "anon";
  } // end if null
} // end getQuote

const getQuotes = async () => {
  quotes = [];
  const requestURL = "https://type.fit/api/quotes";
  await fetch(requestURL).then((response) => {
    let data = JSON.parse(response);
    console.log(data);
    quotes = data;
  });
};

function xgetQuotes() {
  if (debug) {
    console.log("getquotes");
  }
  const requestURL = "https://type.fit/api/quotes";
  fetch(requestURL)
    .then((response) => response.text())
    .then((text) => buildQuotes(text));
  function buildQuotes(quoteString) {
    quotes = JSON.parse(quoteString);
  } // end buildQuotes
  if (debug) {
    console.log("end getquotes");
  }
} // end getquotes

document.getElementById("done").style.display = "none";
newGame();
