const CANVAS_SIZE = {x: 640, y: 480};
var resolutionScale = 1;

var assets = {};

var gameState = 0;

var mousePressedLastFrame = false;
var mousePressedThisFrame = false;

var inkStory;
var lastText = "";
var pauseStory = false;

function deltaTime()
{
    return 1 / (frameRate() == 0 ? 0.016667 : frameRate()); //Estimate 60fps if we read 0
}

function setCanvasSize()
{
    var sx = floor(windowWidth / CANVAS_SIZE.x);
    var sy = floor(windowHeight / CANVAS_SIZE.y);
    resolutionScale = min(sx, sy);
}

function setup()
{
    setCanvasSize();
    frameRate(60);
    var canvas = createCanvas(CANVAS_SIZE.x * resolutionScale, CANVAS_SIZE.y * resolutionScale).elt;
    var ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
}

function windowResized()
{
    setCanvasSize();
    resizeCanvas(CANVAS_SIZE.x * resolutionScale, CANVAS_SIZE.y * resolutionScale);
}

// By some 'miracle', p5.js doesn't have a way to load a text file as a single string, only as an array split per line.
// The person who decided this was a good idea was wrong. Very VERY wrong.
function loadStory(path)
{
    var text = loadStrings(path);
    var str = "";
    for (var i = 0; i < text.length; i++)
    {
        str += text[i];
    }

    return str;
}

function preload()
{
    assets.background = loadImage("assets/background/paper_background.png");
    assets.menuBackground = loadImage("assets/background/paper_background_menu.png");
    assets.font = loadFont("assets/OvertheRainbow.ttf");
    inkStory = new inkjs.Story(storyContent);
}

function resumeStory()
{
    pauseStory = false;
    lastText = "";
}

function drawButton(txt, x, y, w, h, hoverColor, pressedColor)
{
    push();
    noStroke();
    var pressed = false;
    var mx = mouseX / resolutionScale;
    var my = mouseY / resolutionScale;
    if (collidePointRect(mx, my, x, y, w, h))
    {
        pressed = !mousePressedThisFrame && mousePressedLastFrame;

        if (mouseIsPressed)
        {
            push();
            fill(pressedColor);
            rect(x, y, w, h);
            pop();
        }
        else
        {
            push();
            fill(hoverColor);
            rect(x, y, w, h);
            pop();
        }
    }

    textAlign(CENTER);
    textSize(16);
    text(txt, x, y, w, h);

    pop();

    return pressed;
}

function drawStory()
{
    image(assets.background, 0, 0);
    while(inkStory.canContinue && !pauseStory)
    {
        var newLine = inkStory.Continue();
        if (newLine.length > 0 && newLine[0] == '%')
        {
            
        }
        else
        {
            lastText += newLine;
        }
        if (inkStory.currentTags.includes("pause")) pauseStory = true;
    }
    text(lastText, 24, 18, CANVAS_SIZE.x - 24, CANVAS_SIZE.y - 18);

    if (pauseStory)
    {
        if (drawButton("Continue >", 500, 420, 100, 30, 'rgba(81, 76, 70, 0.5)', 'rgba(81, 76, 70, 0.8)'))
        {
            resumeStory();
        }
    }
}

function draw()
{
    background(0);
    textFont(assets.font);
    textSize(20);
    push();
    scale(resolutionScale);
    mousePressedThisFrame = mouseIsPressed;
    if (gameState == 0)
    {
        push();
        textAlign(CENTER);
        image(assets.menuBackground, 0, 0);
        text("Travels", 0, CANVAS_SIZE.y / 2, CANVAS_SIZE.x);
        var pressed = drawButton("Begin", (CANVAS_SIZE.x / 2) - 40, (CANVAS_SIZE.y / 2) + 20, 80, 30, 'rgba(0, 255, 0, 0.5)', 'rgba(0, 100, 0, 0.5)');
        if (pressed)
        {
            gameState = 1;
        }
    }
    else if (gameState == 1)
    {
        drawStory();
    }
    pop();

    mousePressedLastFrame = mousePressedThisFrame;
}
