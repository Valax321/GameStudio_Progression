const CANVAS_SIZE = {x: 640, y: 480};
var resolutionScale = 1;

var assets = {};

var gameState = 0;

var mousePressedLastFrame = false;
var mousePressedThisFrame = false;

var inkStory;
var lastText = "";
var pauseStory = false;

var currentIllustrstion;
var illustrationLoaded = false;
var illustrationPosition;

var debugGraphicPlacer = false;

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
    //ctx.imageSmoothingEnabled = false;
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
    illustrationLoaded = false;
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
            var cmd = newLine.split(":");
            var args = cmd[1].trim().split(",");
            if (cmd[0] == "%drawGraphic")
            {
                illustrationLoaded = false;
                loadImage(args[0].trim(), function(img) {
                    currentIllustrstion = img;
                    illustrationLoaded = true;
                    illustrationPosition = createVector(parseInt(args[1].trim()), parseInt(args[2].trim()));
                });
            }
        }
        else
        {
            lastText += newLine;
        }
        if (inkStory.currentTags.includes("pause")) pauseStory = true;
    }

    text(lastText, 24, 18, CANVAS_SIZE.x - 24, CANVAS_SIZE.y - 18);

    if (inkStory.currentChoices.length > 0 && !pauseStory)
    {
        var startY = 300;
        for (var i = 0; i < inkStory.currentChoices.length; i++)
        {
            //console.log(inkStory.currentChoices[i]);
            var pressed = drawButton(inkStory.currentChoices[i].text, (CANVAS_SIZE.x / 2) - 100, startY, 200, 30, 'rgba(81, 76, 70, 0.5)', 'rgba(81, 76, 70, 0.8)');
            startY += 35;
            if (pressed)
            {
                inkStory.ChooseChoiceIndex(i);
            }
        }
    }

    if (illustrationLoaded)
    {
        image(currentIllustrstion, illustrationPosition.x, illustrationPosition.y);
    }

    if (pauseStory)
    {
        if (drawButton("Continue >", 500, 420, 100, 30, 'rgba(81, 76, 70, 0.5)', 'rgba(81, 76, 70, 0.8)'))
        {
            resumeStory();
        }

        if (drawButton("Inventory", 50, 420, 100, 30, 'rgba(81, 76, 70, 0.5)', 'rgba(81, 76, 70, 0.8)'))
        {
            gameState = 2;
        }
    }
}

function drawInventory()
{
    image(assets.menuBackground, 0, 0);

    push();
    textAlign(CENTER);
    text("Inventory", 0, 20, CANVAS_SIZE.x, 30);
    pop();

    var items = inkStory.variablesState.$("currentInventory");
    var itemCount = items.Count;
    console.log(items);
    var itemArray = [];
    for (var itemPropName in items._keys)
    {
        if (items._keys.hasOwnProperty(itemPropName))
        {
            itemArray.push(items._keys[itemPropName].itemName);
        }
    }

    var columns = max(floor(itemCount / 10), 1);

    var totalItemPrintCount = 0;
    for (var c = 0; c < columns; c++)
    {
        var columnTotal = 0;
        var columnY = 50;
        while (totalItemPrintCount < itemCount && columnTotal < 10)
        {
            text(itemArray[itemCount], (c * 100) + 25, columnY);
            columnY += 30;
            columnTotal++;
            totalItemPrintCount++;
        }
    }

    if (drawButton("Back", (CANVAS_SIZE.x / 2) - 50, 420, 100, 30, 'rgba(81, 76, 70, 0.5)', 'rgba(81, 76, 70, 0.8)'))
    {
        gameState = 1;
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
    else if (gameState == 2)
    {
        drawInventory();
    }

    if (debugGraphicPlacer)
    {
        push();
        var mx = mouseX / resolutionScale;
        var my = mouseY / resolutionScale;
        textFont("Arial");
        text("x: " + mx.toFixed(0), mx + 20, my + 20);
        text("y: " + my.toFixed(0), mx + 20, my + 40);
        pop();
    }

    pop();

    mousePressedLastFrame = mousePressedThisFrame;
}

function keyTyped()
{
    if (key == ' ')
    {
        debugGraphicPlacer = !debugGraphicPlacer;
    }
}
