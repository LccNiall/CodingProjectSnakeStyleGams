function spawnFruit () {
    Fruit.set(LedSpriteProperty.X, randint(0, 4))
    Fruit.set(LedSpriteProperty.Y, randint(0, 4))
}
input.onButtonPressed(Button.A, function () {
    Snake.turn(Direction.Left, 90)
})
function increaseSize () {
    let SnakeLength: game.LedSprite[] = []
    SnakeLength.push(game.createSprite(SnakeLength[SnakeLength.length].get(LedSpriteProperty.X), SnakeLength[SnakeLength.length].get(LedSpriteProperty.Y)))
    SnakeLength[SnakeLength.length].set(LedSpriteProperty.Direction, SnakeLength[SnakeLength.length - 1].get(LedSpriteProperty.Direction))
    SnakeLength[SnakeLength.length].move(-1)
}
input.onButtonPressed(Button.B, function () {
    Snake.turn(Direction.Right, 90)
})
let isOnEdge = 0
let Fruit: game.LedSprite = null
let Snake: game.LedSprite = null
game.setLife(3)
let Score = 0
let Speed = 2000
Snake = game.createSprite(2, 4)
Snake.set(LedSpriteProperty.Direction, 0)
Fruit = game.createSprite(0, 2)
basic.forever(function () {
    if (Snake.isTouching(Fruit)) {
        game.addScore(1)
        spawnFruit()
    }
    if (Snake.isTouchingEdge()) {
        if (isOnEdge == 0) {
            if (Snake.get(LedSpriteProperty.X) == 0 && Snake.get(LedSpriteProperty.Direction) == 270) {
                isOnEdge = 1
            } else if (Snake.get(LedSpriteProperty.X) > 0 && Snake.get(LedSpriteProperty.Direction) == 90) {
                isOnEdge = 1
            } else if (Snake.get(LedSpriteProperty.Y) == 0 && Snake.get(LedSpriteProperty.Direction) == 90) {
                isOnEdge = 1
            } else if (Snake.get(LedSpriteProperty.Y) == 4 && Snake.get(LedSpriteProperty.Direction) == 180) {
                isOnEdge = 1
            } else {
                isOnEdge = 0
            }
        } else {
            game.removeLife(1)
        }
    }
    basic.pause(Speed)
    Snake.move(1)
})
control.inBackground(function () {
    if (Speed > 200) {
        basic.pause(3000)
        Speed = Speed - Speed / 4
    }
})
