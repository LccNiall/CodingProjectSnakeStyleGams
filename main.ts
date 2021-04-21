function spawnFruit () {
    Fruit.set(LedSpriteProperty.X, randint(0, 4))
    Fruit.set(LedSpriteProperty.Y, randint(0, 4))
}
input.onButtonPressed(Button.A, function () {
    SnakeLength[0].turn(Direction.Left, 90)
})
function increaseSize () {
    SnakeLength.push(game.createSprite(SnakeLength[SnakeLength.length].get(LedSpriteProperty.X), SnakeLength[SnakeLength.length].get(LedSpriteProperty.Y)))
    SnakeLength[SnakeLength.length].set(LedSpriteProperty.Direction, SnakeLength[SnakeLength.length - 1].get(LedSpriteProperty.Direction))
    SnakeLength[SnakeLength.length].move(-1)
}
input.onButtonPressed(Button.AB, function () {
    increaseSize()
})
input.onButtonPressed(Button.B, function () {
    SnakeLength[0].turn(Direction.Right, 90)
})
control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MICROBIT_EVT_ANY, function () {
	
})
let LastBlock: game.LedSprite = null
let index = 0
let Fruit: game.LedSprite = null
let SnakeLength: game.LedSprite[] = []
let Score = 0
let Speed = 2000
SnakeLength = [game.createSprite(2, 5)]
for (let value of SnakeLength) {
    value.turn(Direction.Left, 90)
}
Fruit = game.createSprite(0, 2)
basic.forever(function () {
    index = 0
    for (let value of SnakeLength) {
        LastBlock = value
        if (index == 0) {
            value.move(1)
        } else {
            value.set(LedSpriteProperty.Direction, LastBlock.get(LedSpriteProperty.Direction))
            value.move(1)
        }
        basic.pause(Speed)
    }
    if (SnakeLength[0].isTouching(Fruit)) {
        game.addScore(1)
        spawnFruit()
    }
    if (SnakeLength[0].isTouchingEdge()) {
        game.gameOver()
    }
})
control.inBackground(function () {
    if (Speed > 200) {
        basic.pause(3000)
        Speed += -100
    }
})
