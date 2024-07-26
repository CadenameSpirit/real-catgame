enum ActionKind {
    Walking,
    Idle,
    Jumping,
    leftwalk,
    rightWalk
}
namespace SpriteKind {
    export const bumper = SpriteKind.create()
    export const goal = SpriteKind.create()
    export const Enemy2 = SpriteKind.create()
    export const enemy3 = SpriteKind.create()
    export const enemy4 = SpriteKind.create()
    export const enemy5 = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.enemy3, assets.tile`myTile0`, function (sprite, location) {
    if (bad3.tileKindAt(TileDirection.Right, assets.tile`bad no tile`)) {
        bad3.vx = -20
    } else if (bad3.tileKindAt(TileDirection.Left, assets.tile`bad no tile`)) {
        bad3.vx = 20
    }
})
scene.onHitWall(SpriteKind.enemy4, function (sprite, location) {
    if (bad_4.isHittingTile(CollisionDirection.Right)) {
        bad_4.vx = -20
    } else if (bad_4.isHittingTile(CollisionDirection.Left)) {
        bad_4.vx = 20
    }
})
scene.onOverlapTile(SpriteKind.Enemy2, assets.tile`myTile0`, function (sprite, location) {
    if (bad2.tileKindAt(TileDirection.Right, assets.tile`bad no tile`)) {
        bad2.vx = -20
    } else if (bad2.tileKindAt(TileDirection.Left, assets.tile`bad no tile`)) {
        bad2.vx = 20
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    attemptJump()
    animateJump()
    animation.setAction(hero, ActionKind.Jumping)
})
// lets cat jump
function attemptJump () {
    // a ledge or double jumping
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        hero.vy = -4 * pixlsToMeters
        music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    } else if (canDoubleJump) {
        dubleJumpSpeed = -5 * pixlsToMeters
        // double jump
        if (hero.vy >= -40) {
            dubleJumpSpeed = -5.5 * pixlsToMeters
            hero.startEffect(effects.trail, 500)
            music.play(music.createSoundEffect(WaveShape.Square, 400, 600, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        }
        hero.vy = dubleJumpSpeed
        canDoubleJump = false
    }
}
sprites.onDestroyed(SpriteKind.Food, function (sprite) {
    level += 1
    clearGame()
    makelevestuff()
    createPlayer(hero)
    if (level == 1) {
        tiles.setCurrentTilemap(tilemap`testLevel`)
        makeGodFood()
        makeEnemy()
    }
    if (level == 2) {
        tiles.setCurrentTilemap(tilemap`level2`)
        makeGodFood()
        makeEnemy()
    }
    if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level0`)
        makeGodFood()
        makeEnemy()
    }
})
// the function that chaNGES TILE MAPS
function setLevelTileMap (level: number) {
    clearGame()
    if (level == 1) {
        tiles.setCurrentTilemap(tilemap`testLevel`)
        makeGodFood()
    }
    if (level == 2) {
        tiles.setCurrentTilemap(tilemap`level2`)
        makeGodFood()
    }
    if (level == 3) {
        tiles.setCurrentTilemap(tilemap`level0`)
        makeGodFood()
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, 100, -31)
    projectile.ax = 100000
    if (controller.right.isPressed()) {
        projectile.ax = 100000
    } else if (controller.left.isPressed()) {
        projectile.ax = -100000
    }
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.UntilDone)
})
scene.onOverlapTile(SpriteKind.enemy5, assets.tile`myTile0`, function (sprite, location) {
    if (bad5.tileKindAt(TileDirection.Right, assets.tile`bad no tile`)) {
        bad5.vx = -20
    } else if (bad5.tileKindAt(TileDirection.Left, assets.tile`bad no tile`)) {
        bad5.vx = 20
    }
})
function animateJump () {
    AnimatedJump = animation.createAnimation(ActionKind.Jumping, 200)
    animation.attachAnimation(hero, AnimatedJump)
    AnimatedJump.addAnimationFrame(assets.image`myImage`)
    for (let index = 0; index < 30; index++) {
        AnimatedJump.addAnimationFrame(assets.image`Hero1`)
    }
}
function makeEnemy () {
    bad = sprites.create(assets.image`Doog`, SpriteKind.Enemy)
    bad2 = sprites.create(assets.image`Doog`, SpriteKind.Enemy2)
    bad3 = sprites.create(assets.image`Doog`, SpriteKind.enemy3)
    bad_4 = sprites.create(assets.image`Doog`, SpriteKind.enemy4)
    bad5 = sprites.create(assets.image`Doog`, SpriteKind.enemy5)
    bad.vx = 20
    bad2.vx = 20
    bad3.vx = 20
    bad_4.vx = 20
    bad5.vx = 20
    bad.z = 5
    bad2.z = 5
    bad3.z = 5
    bad_4.z = 5
    bad5.z = 5
    bad.ay = gravity
    bad2.ay = gravity
    bad3.ay = gravity
    bad_4.ay = gravity
    bad5.ay = gravity
    tiles.placeOnRandomTile(bad, assets.tile`myTile0`)
    tiles.placeOnRandomTile(bad2, assets.tile`myTile0`)
    tiles.placeOnRandomTile(bad3, assets.tile`myTile0`)
    tiles.placeOnRandomTile(bad_4, assets.tile`myTile0`)
    tiles.placeOnRandomTile(bad5, assets.tile`myTile0`)
}
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    hero.ax = 100000
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.enemy5, function (sprite, otherSprite) {
    sprites.destroy(bad5, effects.spray, 500)
    info.changeScoreBy(1)
})
controller.right.onEvent(ControllerButtonEvent.Released, function () {
    hero.ax = 0
})
controller.left.onEvent(ControllerButtonEvent.Released, function () {
    hero.ax = 0
})
function Nextlevel () {
    return currentLevel != levelCount
}
scene.onHitWall(SpriteKind.enemy5, function (sprite, location) {
    if (bad5.isHittingTile(CollisionDirection.Right)) {
        bad5.vx = -20
    } else if (bad5.isHittingTile(CollisionDirection.Left)) {
        bad5.vx = 20
    }
})
function clearGame () {
    for (let value5 of sprites.allOfKind(SpriteKind.bumper)) {
        sprites.destroy(value5)
    }
    for (let value2 of sprites.allOfKind(SpriteKind.Food)) {
        sprites.destroy(value2)
        for (let value3 of sprites.allOfKind(SpriteKind.goal)) {
            sprites.destroy(value3)
        }
        for (let value3 of sprites.allOfKind(SpriteKind.Enemy)) {
            sprites.destroy(value3)
        }
    }
}
info.onScore(100, function () {
	
})
scene.onHitWall(SpriteKind.enemy3, function (sprite, location) {
    if (bad3.isHittingTile(CollisionDirection.Right)) {
        bad3.vx = -20
    } else if (bad3.isHittingTile(CollisionDirection.Left)) {
        bad3.vx = 20
    }
})
function changelevel () {
    levelCount += 1
    currentLevel += 1
    Nextlevel()
    setLevelTileMap(levelCount)
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    if (bad.isHittingTile(CollisionDirection.Right)) {
        bad.vx = -20
    } else if (bad.isHittingTile(CollisionDirection.Left)) {
        bad.vx = 20
    }
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`myTile0`, function (sprite, location) {
    if (bad.tileKindAt(TileDirection.Right, assets.tile`bad no tile`)) {
        bad.vx = -20
    } else if (bad.tileKindAt(TileDirection.Left, assets.tile`bad no tile`)) {
        bad.vx = 20
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.enemy3, function (sprite, otherSprite) {
    sprites.destroy(bad3, effects.spray, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy2, function (sprite, otherSprite) {
    sprites.destroy(bad2, effects.spray, 500)
    info.changeScoreBy(1)
})
controller.A.onEvent(ControllerButtonEvent.Repeated, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 2 2 2 2 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, hero, 100, -31)
    projectile.ax = 100000
    projectile.ay = 0
    if (controller.right.isPressed()) {
        projectile.ax = 100000
    } else if (controller.left.isPressed()) {
        projectile.ax = -100000
        projectile.ay = 0
        projectile.ay = 0
    }
})
scene.onHitWall(SpriteKind.Enemy2, function (sprite, location) {
    if (bad2.isHittingTile(CollisionDirection.Right)) {
        bad2.vx = -20
    } else if (bad2.isHittingTile(CollisionDirection.Left)) {
        bad2.vx = 20
    }
})
function makelevestuff () {
    startlocation = tiles.getTilesByType(assets.image`Hero1`)[0]
    tiles.placeOnTile(hero, startlocation)
    tiles.setTileAt(startlocation, assets.tile`transparency16`)
    makeEnemy()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(5)
    sprites.destroy(god_food)
    god_food.y += -1000
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    game.showLongText("may my life serve you my loard", DialogLayout.Bottom)
    info.setScore(0)
    sprites.destroy(bad)
    sprites.destroy(bad2)
    sprites.destroy(bad3)
    sprites.destroy(bad_4)
    sprites.destroy(bad5)
})
function createPlayer (player2: Sprite) {
    tiles.placeOnTile(hero, tiles.getTileLocation(12, 1))
    hero.ay = gravity
    scene.cameraFollowSprite(hero)
    controller.moveSprite(hero, 100, 0)
    hero.z = 5
    info.setLife(1)
    info.setScore(0)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.enemy4, function (sprite, otherSprite) {
    sprites.destroy(bad_4, effects.spray, 500)
    info.changeScoreBy(1)
})
info.onScore(5, function () {
    info.changeLifeBy(1)
    info.setScore(0)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(bad, effects.spray, 500)
    info.changeScoreBy(1)
})
scene.onOverlapTile(SpriteKind.enemy4, assets.tile`myTile0`, function (sprite, location) {
    if (bad_4.tileKindAt(TileDirection.Right, assets.tile`bad no tile`)) {
        bad_4.vx = -20
    } else if (bad_4.tileKindAt(TileDirection.Left, assets.tile`bad no tile`)) {
        bad_4.vx = 20
    }
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    hero.ax = -100000
})
function animateWalk () {
    if (controller.right.isPressed()) {
        rightWalk = animation.createAnimation(ActionKind.rightWalk, 200)
        animation.attachAnimation(hero, rightWalk)
        for (let index = 0; index < 60; index++) {
            rightWalk.addAnimationFrame(assets.image`Hero0`)
            rightWalk.addAnimationFrame(assets.image`Hero1`)
        }
    } else if (controller.left.isPressed()) {
        leftWalk = animation.createAnimation(ActionKind.leftwalk, 200)
        animation.attachAnimation(hero, leftWalk)
        leftWalk.addAnimationFrame(assets.image`Heroleft`)
        leftWalk.addAnimationFrame(assets.image`Hero2`)
    }
}
function makeGodFood () {
    god_food = sprites.create(assets.image`god food`, SpriteKind.Food)
    god_food.ay = gravity
    tiles.placeOnRandomTile(god_food, assets.tile`god food spone tile`)
}
let leftWalk: animation.Animation = null
let rightWalk: animation.Animation = null
let god_food: Sprite = null
let startlocation: tiles.Location = null
let bad: Sprite = null
let AnimatedJump: animation.Animation = null
let bad5: Sprite = null
let projectile: Sprite = null
let level = 0
let dubleJumpSpeed = 0
let canDoubleJump = false
let bad2: Sprite = null
let bad_4: Sprite = null
let bad3: Sprite = null
let currentLevel = 0
let levelCount = 0
let gravity = 0
let pixlsToMeters = 0
let hero: Sprite = null
music.play(music.stringPlayable("A B G G B G A C5 ", 214), music.PlaybackMode.LoopingInBackground)
hero = sprites.create(assets.image`Hero1`, SpriteKind.Player)
pixlsToMeters = 30
gravity = 10 * pixlsToMeters
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999959999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999959999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999119999999559999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111119999599999999999
    9999999999999999999111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111199599999999999
    9999999999999999911111111111199999999999999999999999999999999999999999999999999999999999991111111111111111111111111111999999999911111111111111111199599999999999
    9999999999999911111111111111199999999999911111111111999999999999999999999999999999999999911111111111111111111111111111199999999911111111111111111199599999999999
    9999999999111111111111111111119999999999911111111111111111111111199999999999999999999999111111111111111111111111111111999999999991111111111119999999599999999999
    9999999999111111111111111111111111999999911111111111111111111111199999999999999999999991111111111111111111111111111119999999999999111111199999999999599999999999
    9999999999111111111111111111111111111999911111111111111111111111999999999999999999999911111111111111111111111111119999999999999999911999999999999995599999999999
    9999999999111111111111111111111111111999111111111111111111111119999999999999999999999911111111111111111111111111199999999999999999999999999999999999999999999999
    9999999999111111111111111111111111111999111111111111111111111111999999999999999999999911111111111111111111111111111111999999999999995999999999999999999999999999
    9999999999111111111111111111111111199999111111111111111111111111199999999999999999911111111111111111111111111111111111119999999999995599999995555555555559999999
    9999999999999999991111111111111999999999111111111111111111111111199999999999999991111111111111111111111111111111111111119999999999999599999555555555555555599999
    9999999999999999999911111119999999999999999999999991111111999999999999999999999991111111111111111111111111111111111119999999999999999995555555555555555555555999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111119999999999999999999999999999999999955555555555555555555555599
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555559
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999955555555555555555555555555559
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555555555555
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555555555555
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555555555555555555555555555555
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555fffffffff5555ffffffffff5555
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555fffffffffffffffffffffff5555
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995ffffffffffff5555ffffffffffffff
    9999999999999999999999999999999999999999999911111111111111111199999999999999999999999999999999999999999999999999999999999999999995f55fffffffff55555fffffffff5555
    9999999999999999999999999999999999999999111111111111111111111119999999999999999999991111119999999999999999999999999999955555559995555fffffffff55555ffffffff55555
    9999999999999999999999999999999999999999111111111111111111111119999999999999999999911111111999999999999999999999555555559999999995555fffffff55555555ffffff555555
    999999999999999999999999999999999999999911111111111111111111111999999999999999999991111111111119999999999999999999999999999999999555555fffff555555555fffff555555
    9999999999999999999999999999999999999999111111111111111111111119999999999999999999111111111111111199999999999999999999999999999995555555555555555555555555555555
    999999999999999999999999999999999999999991111111111111111111111111199999999991111111111111111111111999999999999999999999999999999555555555555555555555555f555555
    9999999999999999999999999999999999999999911111111111111111111111111999999999911111111111111111111119999999999999999999999999999999555555555555555555555fff555559
    9999999999999999999999999999999999999999911111111111111111111111111999999999911111111111111111111119999999999999999999999999999999555555555fffffffffffff55555599
    9999999999999999999999999999999999999999911111111111111111111111119999999999911111111111111111119999999999999999999999999999999999955555555555555555555555555599
    9999999999999999999999999999999999999999991111111111111111111111999999999999999911111111119999999999999999999999999999999999999999995555555555555555555555555999
    9999999999999999999999999999999999999999999999999999111111999999999999999999999999999999999999999999999999999999999999999999999999999555555555555555555555559999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555555555555555555599999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999955555555555555555999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995555555555599999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999559999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999955599999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995599999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999559999999999999995999999999999559999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999555999999999999999955999999999999995599
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995999999999999999999959999999999999999599
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995559999999999999999999959999999999999999955
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999955999999999999999999999959999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999959999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999559999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111199999999999999999999999999999999999999599999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999911111111111111999999999999999999999999999999999999599999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111111111111199999999999999999999999999999999999599999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999111111111111111111111111111199999999999999999999999999999599999999999999999999
    9999999999999999999999991111111111999999999999999999999999999999999999999999999999111111111111111111111111111111999999999999999999999999995599999999999999999999
    9999999999999999999999911111111111999999999999999999999999999999999999999999999999111111111111111111111111111111999999999999999999999999995999999999999999999999
    9999999999911111111111111111111111199999999999999999999999999999999999999999999999111111111111111111111111111119999999999999999999999999995999999999999999999999
    9999999999111111111111111111111111199999999999999999999999999999999999999999999999991111111111111111111199999999999999999999999999999999995999999999999999999999
    9999999999111111111111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995999999999999999999999
    9999999999111111111111111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999995999999999999999999999
    9999999999111111111111111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999911111111111111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999111111111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999911111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999911111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999111199999999999999999999999999999911111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999911111111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999111111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999911111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999991111111111111111111111119999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999991111111111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999111111111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999111111111111199999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    `)
createPlayer(hero)
levelCount = 2
currentLevel = 2
setLevelTileMap(currentLevel)
makelevestuff()
animateWalk()
game.onUpdate(function () {
    if (hero.isHittingTile(CollisionDirection.Bottom)) {
        canDoubleJump = true
    }
})
game.onUpdate(function () {
	
})
