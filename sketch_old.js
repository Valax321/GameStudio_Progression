const CANVAS_SIZE = {x: 320, y: 240};
var canvasScale = 1;

const DrawMode = {
    DRAWMODE_NONE: -9999,
    DRAWMODE_STATIC: -1000,
    DRAWMODE_DYNAMIC: -100,
    DRAWMODE_PLAYER: 0
};

const UpdateMode = {
    UPDATEMODE_NONE: -9999,
    UPDATEMODE_PRE_PLAYER: -1000,
    UPDATEMODE_PLAYER: 0,
    UPDATEMODE_POST_PLAYER: 1000
};

var input = {
    up: false,
    down: false,
    left: false,
    right: false,
    use: false
};

function deltaTime()
{
    return 1 / (frameRate() == 0 ? 0.016667 : frameRate()); //Estimate 60fps if we read 0
}

class Camera
{
    constructor(trackTarget)
    {
        this.trackTarget = trackTarget;
        this.updateMode = UpdateMode.UPDATEMODE_POST_PLAYER;
        this.drawMode = DrawMode.DRAWMODE_NONE;
    }

    update()
    {

    }
}

// This is an object so we don't need to worry about resetting the global state to restart the game.
// We can just remove the old world state and create a new instance to restart the game this way.
class GameWorld
{
    constructor(mapPath)
    {
        this.hasLoaded = false;
        this.entities = {};
        this.assets = {};
        loadJSON(mapPath, function(data) {
            this.mapData = data;
        }, function(error) {
            console.error("ERROR LOADING MAP DATA JSON FILE: %s", error);
        });
    }

    calcAssetReferenceCount()
    {

    }

    ents2UpdateList()
    {
        var updateList = [];

        for (var ent in this.entities)
        {
            if (this.entities.hasOwnProperty(ent))
            {
                if (this.entities[ent].updateMode != UpdateMode.UPDATEMODE_NONE)
                {
                    updateList.push(this.entities[ent]);
                }
            }
        }

        updateList.sort(function(a, b) {
            if (a.updateLayer < b.updateLayer) return -1;
            if (a.updateLayer == b.updateLayer) return 0;
            else return 1;
        });

        return updateList;
    }

    ents2DrawList()
    {
        var drawList = [];

        for (var ent in this.entities)
        {
            if (this.entities.hasOwnProperty(ent))
            {
                if (this.entities[ent].drawMode != DrawMode.DRAWMODE_NONE)
                {
                    drawList.push(this.entities[ent]);
                }
            }
        }

        drawList.sort(function(a, b) {
            if (a.drawLayer < b.drawLayer) return -1;
            else if (a.drawLayer == b.drawLayer) return 0;
            else return 1;
        });

        return drawList;
    }

    spawnEntity(entName, entClass, props)
    {
        var ent = new classDef[entClass](name, props);
        if (ent != undefined)
        {
            this.entities[entName] = ent; //Assign the entity
            return ent;
        }
        else
        {
            console.error("Undefined entity class %s", entClass);
            return null;
        }
    }

    update()
    {
        var entList = ents2UpdateList();

        for (var i = 0; i < entList.length; i++)
        {
            var ent = entList[i];
            ent.update();
        }
    }

    draw()
    {
        var drawList = ents2DrawList();

        for (var i = 0; i < drawList.length; i++)
        {
            var ent = entList[i];
            ent.draw();
        }
    }
}

class PlayerCharacter
{
    constructor(name, props)
    {
        this.updateLayer = -1000;
        this.position = createVector(props.startPos.x, props.startPos.y); //Needs to be changed to where the bed is, or load from a file.
    }

    update()
    {

    }

    draw()
    {

    }
}

var classDef = {
    PlayerCharacter
};

var currentWorld = null;

function keyPressed()
{
    switch (keyCode)
    {
        case LEFT_ARROW:
            input.left = true;
            break;
        case RIGHT_ARROW:
            input.right = true;
            break;
        case UP_ARROW:
            input.up = true;
            break;
        case DOWN_ARROW:
            input.down = true;
            break;
        case 0x20: //SPACEBAR
            input.use = true;
            break;
    }

    return false;
}

function keyReleased()
{
    switch (keyCode)
    {
        case LEFT_ARROW:
            input.left = false;
            break;
        case RIGHT_ARROW:
            input.right = false;
            break;
        case UP_ARROW:
            input.up = false;
            break;
        case DOWN_ARROW:
            input.down = false;
            break;
        case 0x20: //SPACEBAR
            input.use = false;
            break;
    }

    return false;
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

function preload()
{
    //NOTE: only load instantly needed assets as we can async load the rest when we open the map.
}

function draw()
{
    background(0);
    
}
