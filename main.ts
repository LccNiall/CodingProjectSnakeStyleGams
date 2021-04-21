function spawnFruit () {
    Fruit.set(LedSpriteProperty.X, randint(0, 4))
    Fruit.set(LedSpriteProperty.Y, randint(0, 4))
    increaseSpeed()
}
input.onButtonPressed(Button.A, function () {
    Snake.turn(Direction.Left, 90)
})
input.onButtonPressed(Button.B, function () {
    Snake.turn(Direction.Right, 90)
})
function increaseSpeed () {
    if (Speed > 500) {
        Speed = Speed - Speed / 8
    }
    if (Speed < 500) {
        Speed = 500
    }
}
let isOnEdge = 0
let Fruit: game.LedSprite = null
let Snake: game.LedSprite = null
let Speed = 0
game.setLife(3)
let Score = 0
Speed = 2000
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
            } else if (Snake.get(LedSpriteProperty.X) == 4 && Snake.get(LedSpriteProperty.Direction) == 90) {
                isOnEdge = 1
            } else if (Snake.get(LedSpriteProperty.Y) == 0 && Snake.get(LedSpriteProperty.Direction) == 90) {
                isOnEdge = 1
            } else if (Snake.get(LedSpriteProperty.Y) == 4 && Snake.get(LedSpriteProperty.Direction) == 0) {
                isOnEdge = 1
            } else {
                isOnEdge = 0
            }
        } else {
            game.removeLife(1)
            Snake.set(LedSpriteProperty.X, 2)
            Snake.set(LedSpriteProperty.Y, 4)
            Snake.set(LedSpriteProperty.Direction, 0)
        }
    }
    basic.pause(Speed)
    Snake.move(1)
})
