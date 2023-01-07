/**
 * Defines various functions to give functionality to
 * the terminal website 
 *
 * @summary gives functionality to terminal website 
 * @author Patrick McCarty <patricksantos1234567@gmail.com>
 *
 * Created at     : 2022-11-19 12:21:56 
 * Last modified  : 2022-12-30 12:44:00
 */


/** 
 * sleeps for a given number of ms
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/** 
 * decide how the program should resopond to certain key presses
 */
function choosePath(e){

  document.getElementById("myInput").focus();
  if(e.key == 'Enter'){
    printUser();
  } else if(e.keyCode == '38'){ // up arrow
    e.preventDefault();
    if(counter <= 0){
      document.getElementById("myInput").value = hist[0];
    } else{
      counter--;
      document.getElementById("myInput").value = hist[counter];
    } 
  } else if(e.keyCode == '40'){ // down arrow
    e.preventDefault();
    if(document.getElementById("myInput").value == ""){
      //do nothing
    } else if(counter == hist.length - 1){
      document.getElementById("myInput").value = "";
      counter++;
    } else if(counter > hist.length - 1){
      document.getElementById("myInput").value = "";
    } else{
      counter++;
      document.getElementById("myInput").value = hist[counter];
    }
  }
}


/** 
 * called at the start of the program. Creates text box, displays logo and help message
 */
async function start(){
  let newLine = document.createElement("div");
  newLine.className = "spaced";
  newLine.id = "sp";

  let username = document.createElement("span");
  let col = document.createElement("span");
  let til = document.createElement("span");
  let dol = document.createElement("span");

  let tbox = document.createElement("input");
  tbox.className = "inputText";
  tbox.spellcheck = false;
  tbox.id = "myInput";

  username.appendChild(document.createTextNode("visitor@patricksSite"));
  username.className = "greenText";

  col.appendChild(document.createTextNode(":"));
  col.className = "whiteText";

  til.appendChild(document.createTextNode("~"));
  til.className = "blueText";

  dol.appendChild(document.createTextNode("$"));
  dol.className = "whiteText";

  newLine.appendChild(username);
  newLine.appendChild(col);
  newLine.appendChild(til);
  newLine.appendChild(dol);

  newLine.appendChild(tbox);
  document.body.appendChild(newLine);

  let helpMessage = document.createElement("p");
  helpMessage.className = "hlpMessage";
  helpMessage.id = "hlp";
  helpMessage.textContent = "Type " + "\'help\' for the list of commands in the prompt below";

  logo(true);

  document.getElementById("invisible_div").appendChild(helpMessage);
  document.getElementById("myInput").focus();
}


/** 
 * copies input box and contents into a new string and appends it to the screen.
 * Then decides what function to call based on the input in the text box
 */
function printUser(){

  x = document.getElementById("myInput").value;

  let newLine = document.createElement("div");
  newLine.className = "spaced";

  let username = document.createElement("span");
  let col = document.createElement("span");
  let til = document.createElement("span");
  let dol = document.createElement("span");

  username.appendChild(document.createTextNode("visitor@patricksSite"));
  username.className = "greenText";

  col.appendChild(document.createTextNode(":"));
  col.className = "whiteText";

  til.appendChild(document.createTextNode("~"));
  til.className = "blueText";

  dol.appendChild(document.createTextNode("$"));
  dol.className = "whiteText";

  newLine.appendChild(username);
  newLine.appendChild(col);
  newLine.appendChild(til);
  newLine.appendChild(dol);

  let thing = document.createElement("span");
  thing.appendChild(document.createTextNode(" " + x));
  thing.className = "greyText";
  newLine.appendChild(thing);

  document.getElementById("invisible_div").appendChild(newLine);
  let element = document.getElementById("sp");
  element.scrollIntoView();
  if(x.trim() != ""){
    hist.push(document.getElementById("myInput").value);
  }
  document.getElementById("myInput").value = "";
  counter = hist.length;

  if(x == "clear"){
    clear();
  } else if(x.toLowerCase() == "help"){
    help();
  } else if(x.toLowerCase() == ""){
    // do nothing
  } else if(x.toLowerCase() == "logo"){
    logo(false);
  } else if(x.toLowerCase() == "aboutme"){
    aboutme();
  } else if(x.toLowerCase() == "email"){
    email();
  } else if(x.toLowerCase() == "projects"){
    projects();
  } else if(x.toLowerCase() == "resume"){
	resume();
  }else if(x.toLowerCase() == "history"){
	history();
  }else{
    invalid();
  }

  element = document.getElementById("sp");
  element.scrollIntoView();

}


/** 
 * clears DOM elements from the 'invisible_div', leaving only the input box
 */
function clear(){
  let element = document.getElementById("invisible_div");
  element.innerHTML = '';
}


/** 
 * displays the various commands of this website
 */
function help(){

  const commands = []
  commands[0] = 'help' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'print commands';
  commands[1] = 'clear' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'clear terminal';
  commands[2] = 'aboutme' + '\xa0\xa0\xa0\xa0\xa0' + 'describes who I am';
  commands[3] = 'projects' + '\xa0\xa0\xa0\xa0' + 'display projects';
  commands[4] = 'email' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'display email';
  commands[5] = 'logo' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 'display logo';
  commands[6] = 'resume' + '\xa0\xa0\xa0\xa0\xa0\xa0' + 'display resume in a new tab';
  commands[7] = 'history' + '\xa0\xa0\xa0\xa0\xa0' + 'display previously inputed commands';

  for(let i = 0; i < commands.length; i++){
    let buf = document.createElement("p");
    buf.textContent = commands[i];
    buf.className = "magentaText";
    document.getElementById("invisible_div").appendChild(buf);
  }
}


/** 
 * displays message for invalid commands
 */
function invalid(){
  const store = document.createElement("div");
  store.className = "aquaText";

  const err = document.createElement("div");
  err.appendChild(document.createTextNode("\'" + x + "\'" + " is not a valid command"));

  const hlp = document.createElement("div");
  hlp.appendChild(document.createTextNode("Type " + "\'help\' for the list of commands"));

  store.appendChild(err);
  store.appendChild(hlp);
  document.getElementById("invisible_div").appendChild(store);
}

/** 
 * displays the logo of the webiste and loop trough colors
 * @param {boolean} first - true if this is the first time the function is called
 *							false otherwise
 */
async function logo(first){

  const store = document.createElement("div");

  const lines = [];

  lines[0] = '\xa0' + '1111111' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      '\xa0\xa0\xa0'+ '88' + '';

  lines[1] = '\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11' 
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '00'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0'
      + '11' + '\xa0\xa0' + '88';

  lines[2] = '\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11 111111' + '\xa0\xa0'
      + '11111111' + '\xa0\xa0' + '11111111' + '\xa0\xa0\xa0\xa0\xa0\xa0' + '11111111'
      + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '88' + '\xa0\xa0' + '11111';

  lines[3] = '\xa0' + '1111111' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0'
      + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11 11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11';

  lines[4] = '\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '1111111' + '\xa0\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '1111'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11';

  lines[5] = '\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11 11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11';

  lines[6] = '\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' +'\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11';

  lines[7] = '\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '1111111 1' + '\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11111111'
      + '\xa0\xa0' + '11' +'\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0' + '11111';

  lines[8] = '1111111111' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11';

  lines[9] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '00' + '\xa0\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11';

  lines[10] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11111'
      + '\xa0\xa0\xa0' + '11111111' + '\xa0\xa0' + '11 11' + '\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11 11111' + '\xa0\xa0\xa0\xa0'
      + '111111' + '\xa0\xa0\xa0\xa0\xa0' + '11';

  lines[11] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0'
      + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '111'
      + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0'
      + '111' + '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0' + '11';

  lines[12] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '1111111' + '\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11'
      + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '1111111'
      + '\xa0\xa0\xa0\xa0' + '11';

  lines[13] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11'
      + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0' + '11';

  lines[14] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11' 
      + '\xa0\xa0\xa0' + '11' + '\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11'
      + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0' + '11';

  lines[15] = '\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11111' + '\xa0\xa0\xa0'
      + '11' + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '11'
      + '\xa0\xa0' + '11' + '\xa0\xa0' + '11' + '\xa0\xa0\xa0\xa0' + '11'
      + '\xa0\xa0\xa0\xa0\xa0' + '11' + '\xa0\xa0\xa0' + '1111111 1'
      + '\xa0\xa0' + '11';


  for(let i = 0; i < lines.length; i++){
    let buf = document.createElement("p");
    buf.textContent = lines[i];
    buf.className = "blackText";
    store.appendChild(buf);
    if(i == 7){
      store.appendChild(document.createElement("br"));
    }
  }
  
  document.getElementById("invisible_div").appendChild(store);

  const parent = document.getElementById("invisible_div").lastElementChild;
  const children = parent.children;

  colors = ['tangerineText', 'magentaText', 'aquaText', 'greenText', 'whiteText'];
  for(let c = 0; c < colors.length; c++){
    for(let i = 0; i < children.length; i++){
      await sleep(sleepTime);
      children[i].className = colors[c];
    }
    if(first == true && c == 0){
      document.getElementById("hlp").className = "reddishText";
    }
  }
}


/** 
 * prints a discription about who I am
 */
function aboutme(){
  const store = document.createElement("div");
  const par = document.createElement("p");
  par.className = "half";

  par.textContent = "Hello, my name is Patrick McCarty. I am a fourth year computer science"
      + " student at the University of Wisconsin-Madison. I spent half my life in Brazil and the other"
      + " the other half in Wisconsin. I have only been coding for around a year and a half but"
      + " I have learned a lot in that time. I am excited to continue inproving my developer skill"
      + " with new and exciting projects. I prefer low level programming involving C but many"  
      + " areas of CS interest me.";

  store.appendChild(par);
  document.getElementById("invisible_div").appendChild(par);
}


/** 
 * gives link to email
 */
function email(){
  const store = document.createElement("p");
  store.textContent = "my email: ";
  const link = document.createElement("a");
  link.textContent = "psmccarty@wisc.edu";

  link.href = "mailto:psmccarty@wisc.edu";
  store.appendChild(link);
  document.getElementById("invisible_div").appendChild(store);
}

/** 
 * gives link to projects, links github
 */
function projects(){
  const store = document.createElement("p");
  store.textContent = "Most of the projects I have worked on are closed source,"
      + " but my personal projets are available here: ";
    
  store.className = "half";
  const link = document.createElement("a");
  link.textContent = "github";
  link.href = "https://github.com/psmccarty";
  link.target = "_blank";
  store.appendChild(link);
  document.getElementById("invisible_div").appendChild(store);
}

/**
 * opens resume in a new tab
 */
function resume(){
	window.open('resume.pdf');
}

/**
 * Display history
 */
function history(){
  for(let i = 0; i < hist.length; i++){
    let buf = document.createElement("p");
    buf.textContent = hist[i];
    buf.className = "whiteText";
    document.getElementById("invisible_div").appendChild(buf);
  }
}


window.addEventListener("keydown", choosePath); // listen for key presses

var x = "";			// the input that will be in the input box
var sleepTime = 30; // the time  between each color change for logo
var hist = [];		// an array to store all commands excecuted by the user
var counter = 0;	// used to sift through the previous commands
