/* =====================================
   TACTICAL STRIKE
   FPS TÁTICO
===================================== */

let scene;
let camera;
let renderer;

let player;

let enemies = [];
let walls = [];

let playing = false;
let roundActive = false;

let health = 100;
let armor = 100;

let money = 800;

let ctScore = 0;
let trScore = 0;

let round = 1;

let roundTime = 115;

let ammo = 30;
let reserve = 90;

let currentWeapon = "ak";

let shooting = false;

let yaw = 0;
let pitch = 0;

let pointerLocked = false;

let shootTimer = 0;

let keys = {};

let bombPlanted = false;


/* =====================================
   ARMAS
===================================== */

const weapons = {

    glock: {
        name: "Glock-18",
        price: 200,
        damage: 24,
        head: 70,
        fireRate: 16,
        maxAmmo: 20,
        reserve: 100,
        spread: .012
    },

    deagle: {
        name: "Desert Eagle",
        price: 700,
        damage: 55,
        head: 120,
        fireRate: 35,
        maxAmmo: 7,
        reserve: 35,
        spread: .018
    },

    ak: {
        name: "AK-47",
        price: 2700,
        damage: 36,
        head: 140,
        fireRate: 8,
        maxAmmo: 30,
        reserve: 90,
        spread: .014
    },

    m4: {
        name: "M4A1",
        price: 3100,
        damage: 32,
        head: 125,
        fireRate: 7,
        maxAmmo: 30,
        reserve: 90,
        spread: .011
    },

    awp: {
        name: "AWP",
        price: 4750,
        damage: 115,
        head: 450,
        fireRate: 60,
        maxAmmo: 5,
        reserve: 30,
        spread: .003
    }

};


/* =====================================
   INIT
===================================== */

function init() {

    scene =
        new THREE.Scene();

    scene.background =
        new THREE.Color(
            0x11161b
        );

    scene.fog =
        new THREE.Fog(
            0x11161b,
            15,
            80
        );


    camera =
        new THREE.PerspectiveCamera(
            75,
            innerWidth / innerHeight,
            .1,
            300
        );


    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setSize(
        innerWidth,
        innerHeight
    );

    renderer.setPixelRatio(
        Math.min(
            devicePixelRatio,
            2
        )
    );

    renderer.shadowMap.enabled = true;

    document.body.appendChild(
        renderer.domElement
    );


    createLights();
    createMap();
    createPlayer();

    addEvents();

    animate();
}


/* =====================================
   LIGHTS
===================================== */

function createLights() {

    const ambient =
        new THREE.AmbientLight(
            0x9aa5ad,
            1.7
        );

    scene.add(
        ambient
    );


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            2
        );

    sun.position.set(
        20,
        30,
        15
    );

    sun.castShadow = true;

    scene.add(
        sun
    );

}


/* =====================================
   MAPA
===================================== */

function createMap() {

    /* chão */

    const floor =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                100,
                100
            ),
            new THREE.MeshStandardMaterial({
                color: 0x252a2d
            })
        );

    floor.rotation.x =
        -Math.PI / 2;

    floor.receiveShadow = true;

    scene.add(
        floor
    );


    /* paredes externas */

    wall(
        0,
        4,
        -48,
        96,
        2
    );

    wall(
        0,
        4,
        48,
        96,
        2
    );

    wall(
        -48,
        4,
        0,
        2,
        96
    );

    wall(
        48,
        4,
        0,
        2,
        96
    );


    /* corredor central */

    wall(
        -12,
        3,
        0,
        2,
        32
    );

    wall(
        12,
        3,
        0,
        2,
        32
    );


    /* caixas */

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const x =
            Math.random() * 65 - 32;

        const z =
            Math.random() * 65 - 32;

        crate(
            x,
            z
        );
    }


    /* áreas A/B */

    crate(
        -28,
        -28
    );

    crate(
        28,
        28
    );
}


function wall(
    x,
    y,
    z,
    width,
    depth
) {

    const mesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                width,
                y * 2,
                depth
            ),
            new THREE.MeshStandardMaterial({
                color: 0x343a3e
            })
        );

    mesh.position.set(
        x,
        y,
        z
    );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    scene.add(
        mesh
    );

    walls.push(
        mesh
    );
}


function crate(
    x,
    z
) {

    const mesh =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4,
                4,
                4
            ),
            new THREE.MeshStandardMaterial({
                color: 0x665038
            })
        );

    mesh.position.set(
        x,
        2,
        z
    );

    mesh.castShadow = true;

    scene.add(
        mesh
    );

    walls.push(
        mesh
    );
}


/* =====================================
   PLAYER
===================================== */

function createPlayer() {

    player =
        new THREE.Object3D();

    player.position.set(
        0,
        1.7,
        35
    );

    player.add(
        camera
    );

    scene.add(
        player
    );
}


/* =====================================
   INPUT
===================================== */

function addEvents() {

    window.addEventListener(
        "keydown",
        e => {

            keys[
                e.key.toLowerCase()
            ] = true;

            if (
                e.key.toLowerCase()
                === "r"
            ) {

                reload();
            }

            if (
                e.key.toLowerCase()
                === "b"
            ) {

                toggleBuy();
            }
        }
    );


    window.addEventListener(
        "keyup",
        e => {

            keys[
                e.key.toLowerCase()
            ] = false;
        }
    );


    document.addEventListener(
        "mousemove",
        mouseMove
    );


    document.addEventListener(
        "mousedown",
        e => {

            if (
                e.button === 0
            ) {

                shooting = true;

                shoot();
            }
        }
    );


    document.addEventListener(
        "mouseup",
        e => {

            if (
                e.button === 0
            ) {

                shooting = false;
            }
        }
    );


    document.addEventListener(
        "pointerlockchange",
        () => {

            pointerLocked =
                document.pointerLockElement
                === renderer.domElement;
        }
    );


    renderer.domElement.addEventListener(
        "click",
        () => {

            if (
                playing &&
                !pointerLocked
            ) {

                renderer.domElement.requestPointerLock();
            }
        }
    );


    document
        .getElementById("play")
        .onclick =
        startGame;


    document
        .getElementById("restart")
        ?.addEventListener(
            "click",
            startGame
        );


    document
        .getElementById("continue")
        .onclick =
        nextRound;


    document
        .getElementById("closeBuy")
        .onclick =
        () => {

            document.getElementById(
                "buy"
            ).style.display = "none";
        };


    document
        .querySelectorAll(
            "[data-gun]"
        )
        .forEach(
            button => {

                button.onclick =
                    () => {

                        buy(
                            button.dataset.gun
                        );
                    };
            }
        );


    window.addEventListener(
        "resize",
        resize
    );
}


/* =====================================
   MOUSE
===================================== */

function mouseMove(e) {

    if (!pointerLocked) return;

    yaw -=
        e.movementX * .002;

    pitch -=
        e.movementY * .002;

    pitch =
        THREE.MathUtils.clamp(
            pitch,
            -1.45,
            1.45
        );

    player.rotation.y =
        yaw;

    camera.rotation.x =
        pitch;
}


/* =====================================
   MOVIMENTO
===================================== */

function updatePlayer() {

    if (!roundActive) return;

    const direction =
        new THREE.Vector3();

    if (keys.w)
        direction.z--;

    if (keys.s)
        direction.z++;

    if (keys.a)
        direction.x--;

    if (keys.d)
        direction.x++;


    if (
        direction.length()
    ) {

        direction.normalize();

        direction.applyAxisAngle(
            new THREE.Vector3(
                0,
                1,
                0
            ),
            yaw
        );

        player.position.add(
            direction.multiplyScalar(
                .11
            )
        );
    }


    player.position.x =
        THREE.MathUtils.clamp(
            player.position.x,
            -44,
            44
        );

    player.position.z =
        THREE.MathUtils.clamp(
            player.position.z,
            -44,
            44
        );
}


/* =====================================
   SHOOT
===================================== */

function shoot() {

    if (!roundActive) return;

    if (!pointerLocked) return;

    const weapon =
        weapons[
            currentWeapon
        ];

    if (
        shootTimer > 0
    ) return;


    if (
        ammo <= 0
    ) {

        showMessage(
            "SEM MUNIÇÃO"
        );

        return;
    }


    ammo--;

    shootTimer =
        weapon.fireRate;


    /* RECOIL */

    camera.rotation.x -=
        weapon.spread *
        (1 + Math.random() * 2);


    const ray =
        new THREE.Raycaster();

    ray.setFromCamera(
        new THREE.Vector2(
            0,
            0
        ),
        camera
    );


    const targets = [];


    enemies.forEach(
        enemy => {

            targets.push(
                enemy.body
            );

            targets.push(
                enemy.head
            );
        }
    );


    const hits =
        ray.intersectObjects(
            targets
        );


    if (
        hits.length
    ) {

        const object =
            hits[0].object;

        const enemy =
            enemies.find(
                e =>
                    e.body === object ||
                    e.head === object
            );


        if (enemy) {

            const headshot =
                object === enemy.head;

            const damage =
                headshot
                    ? weapon.head
                    : weapon.damage;


            enemy.hp -=
                damage;


            showHitMarker(
                headshot
            );


            if (
                enemy.hp <= 0
            ) {

                killEnemy(
                    enemy,
                    headshot
                );
            }
        }
    }


    updateHUD();
}


/* =====================================
   HIT MARKER
===================================== */

function showHitMarker(
    headshot
) {

    const crosshair =
        document.getElementById(
            "crosshair"
        );

    crosshair.style.color =
        headshot
            ? "#d6a82d"
            : "white";

    setTimeout(
        () => {

            crosshair.style.color =
                "white";

        },
        100
    );
}


/* =====================================
   RELOAD
===================================== */

function reload() {

    const weapon =
        weapons[
            currentWeapon
        ];

    if (
        ammo >=
        weapon.maxAmmo
    ) return;

    if (
        reserve <= 0
    ) return;


    showMessage(
        "RECARREGANDO..."
    );


    setTimeout(
        () => {

            const need =
                weapon.maxAmmo -
                ammo;

            const amount =
                Math.min(
                    need,
                    reserve
                );

            ammo += amount;

            reserve -= amount;

            updateHUD();

        },
        800
    );
}


/* =====================================
   ENEMIGOS
===================================== */

function spawnEnemy() {

    const group =
        new THREE.Group();


    const body =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                1.2,
                1.5,
                .7
            ),
            new THREE.MeshStandardMaterial({
                color: 0xa83d35
            })
        );

    body.position.y =
        1;


    const head =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                .42,
                12,
                12
            ),
            new THREE.MeshStandardMaterial({
                color: 0xc27b5e
            })
        );

    head.position.y =
        2;


    group.add(
        body
    );

    group.add(
        head
    );


    const angle =
        Math.random() *
        Math.PI * 2;

    const distance =
        25 +
        Math.random() * 12;


    group.position.set(
        Math.cos(angle) *
        distance,
        0,
        Math.sin(angle) *
        distance
    );


    scene.add(
        group
    );


    const enemy = {

        group,

        body,

        head,

        hp:
            100 +
            round * 15,

        speed:
            .018 +
            round * .002,

        shotTimer:
            80 +
            Math.random() * 100

    };


    enemies.push(
        enemy
    );
}


/* =====================================
   UPDATE BOTS
===================================== */

function updateEnemies() {

    enemies.forEach(
        enemy => {

            const direction =
                new THREE.Vector3()
                    .subVectors(
                        player.position,
                        enemy.group.position
                    );


            direction.y = 0;

            const distance =
                direction.length();


            if (
                distance > 4
            ) {

                direction.normalize();

                enemy.group.position.add(
                    direction.multiplyScalar(
                        enemy.speed
                    )
                );
            }


            enemy.group.lookAt(
                player.position.x,
                0,
                player.position.z
            );


            enemy.shotTimer--;


            if (
                enemy.shotTimer <= 0 &&
                distance < 35
            ) {

                enemyShoot(
                    enemy
                );

                enemy.shotTimer =
                    80 +
                    Math.random() * 120;
            }


            if (
                distance < 2
            ) {

                damagePlayer(
                    .4
                );
            }
        }
    );
}


/* =====================================
   BOT ATIRA
===================================== */

function enemyShoot(
    enemy
) {

    const accuracy =
        Math.random();


    if (
        accuracy < .45
    ) return;


    damagePlayer(
        8 +
        Math.random() * 10
    );


    addKillFeed(
        "INIMIGO",
        "VOCÊ"
    );
}


/* =====================================
   DANO
===================================== */

function damagePlayer(
    damage
) {

    if (!roundActive) return;


    const armorDamage =
        Math.min(
            armor,
            damage * .5
        );


    armor -=
        armorDamage;

    health -=
        damage -
        armorDamage;


    updateHUD();


    if (
        health <= 0
    ) {

        health = 0;

        endRound(
            false,
            "Você foi eliminado."
        );
    }
}


/* =====================================
   KILL
===================================== */

function killEnemy(
    enemy,
    headshot
) {

    const index =
        enemies.indexOf(
            enemy
        );

    if (
        index === -1
    ) return;


    scene.remove(
        enemy.group
    );

    enemies.splice(
        index,
        1
    );


    scoreMoney(
        300
    );


    addKillFeed(
        "VOCÊ" +
        (headshot
            ? " 🎯"
            : ""),
        "INIMIGO"
    );


    if (
        enemies.length === 0
    ) {

        endRound(
            true,
            "Todos os inimigos foram eliminados."
        );
    }
}


/* =====================================
   DINHEIRO
===================================== */

function scoreMoney(
    amount
) {

    money += amount;

    updateHUD();
}


/* =====================================
   BUY MENU
===================================== */

function toggleBuy() {

    if (!roundActive) return;

    const buy =
        document.getElementById(
            "buy"
        );

    buy.style.display =
        buy.style.display === "flex"
            ? "none"
            : "flex";


    document.getElementById(
        "buyMoney"
    ).textContent =
        money;
}


function buy(
    gun
) {

    if (
        gun === "armor"
    ) {

        if (
            money >= 650
        ) {

            money -= 650;

            armor = 100;

            updateHUD();
        }

        return;
    }


    const weapon =
        weapons[gun];

    if (!weapon) return;


    if (
        money <
        weapon.price
    ) {

        showMessage(
            "DINHEIRO INSUFICIENTE"
        );

        return;
    }


    money -=
        weapon.price;

    currentWeapon =
        gun;

    ammo =
        weapon.maxAmmo;

    reserve =
        weapon.reserve;


    updateHUD();


    showMessage(
        weapon.name +
        " COMPRADA"
    );
}


/* =====================================
   ROUND
===================================== */

function startGame() {

    document.getElementById(
        "menu"
    ).style.display =
        "none";

    document.getElementById(
        "game"
    ).style.display =
        "block";


    playing = true;

    startRound();
}


function startRound() {

    roundActive = true;

    roundTime = 115;

    health = 100;

    armor = 0;

    bombPlanted = false;


    player.position.set(
        0,
        1.7,
        35
    );


    enemies.forEach(
        e =>
            scene.remove(
                e.group
            )
    );

    enemies = [];


    const amount =
        Math.min(
            2 + round,
            12
        );


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        spawnEnemy();
    }


    const weapon =
        weapons[
            currentWeapon
        ];


    ammo =
        weapon.maxAmmo;

    reserve =
        weapon.reserve;


    updateHUD();
}


/* =====================================
   END ROUND
===================================== */

function endRound(
    playerWon,
    reason
) {

    if (!roundActive) return;

    roundActive = false;


    if (playerWon) {

        ctScore++;

        money += 3250;

        document.getElementById(
            "roundTitle"
        ).textContent =
            "ROUND VENCIDO";

    } else {

        trScore++;

        money += 1400;

        document.getElementById(
            "roundTitle"
        ).textContent =
            "ROUND PERDIDO";
    }


    document.getElementById(
        "roundReason"
    ).textContent =
        reason;


    document.getElementById(
        "roundEnd"
    ).style.display =
        "flex";


    document.exitPointerLock();

    updateHUD();
}


/* =====================================
   PRÓXIMO ROUND
===================================== */

function nextRound() {

    document.getElementById(
        "roundEnd"
    ).style.display =
        "none";


    round++;


    if (
        ctScore >= 13 ||
        trScore >= 13
    ) {

        ctScore = 0;
        trScore = 0;
        round = 1;

        showMessage(
            "NOVO MATCH"
        );
    }


    startRound();
}


/* =====================================
   TIMER
===================================== */

function updateTimer() {

    if (!roundActive) return;

    roundTime -=
        1 / 60;


    if (
        roundTime <= 0
    ) {

        roundTime = 0;

        endRound(
            false,
            "O tempo acabou."
        );
    }


    const minutes =
        Math.floor(
            roundTime / 60
        );

    const seconds =
        Math.floor(
            roundTime % 60
        );


    document.getElementById(
        "timer"
    ).textContent =
        String(minutes)
            .padStart(2, "0")
        + ":" +
        String(seconds)
            .padStart(2, "0");
}


/* =====================================
   HUD
===================================== */

function updateHUD() {

    const weapon =
        weapons[
            currentWeapon
        ];


    document.getElementById(
        "health"
    ).textContent =
        Math.max(
            0,
            Math.floor(
                health
            )
        );


    document.getElementById(
        "armor"
    ).textContent =
        Math.max(
            0,
            Math.floor(
                armor
            )
        );


    document.getElementById(
        "ammo"
    ).textContent =
        ammo;


    document.getElementById(
        "reserve"
    ).textContent =
        reserve;


    document.getElementById(
        "weaponName"
    ).textContent =
        weapon.name;


    document.getElementById(
        "moneyValue"
    ).textContent =
        money;


    document.getElementById(
        "ctScore"
    ).textContent =
        ctScore;


    document.getElementById(
        "trScore"
    ).textContent =
        trScore;


    document.getElementById(
        "buyMoney"
    ).textContent =
        money;
}


/* =====================================
   KILL FEED
===================================== */

function addKillFeed(
    killer,
    victim
) {

    const feed =
        document.getElementById(
            "killFeed"
        );


    const line =
        document.createElement(
            "div"
        );

    line.className =
        "kill";


    line.innerHTML =
        `<b>${killer}</b> ⚔ ${victim}`;


    feed.appendChild(
        line
    );


    setTimeout(
        () => {

            line.remove();

        },
        3000
    );
}


/* =====================================
   MESSAGE
===================================== */

function showMessage(
    text
) {

    const old =
        document.getElementById(
            "tempMessage"
        );


    if (old)
        old.remove();


    const message =
        document.createElement(
            "div"
        );


    message.id =
        "tempMessage";


    message.textContent =
        text;


    message.style.position =
        "fixed";

    message.style.top =
        "105px";

    message.style.left =
        "50%";

    message.style.transform =
        "translateX(-50%)";

    message.style.zIndex =
        "30";

    message.style.color =
        "#d6a82d";

    message.style.fontWeight =
        "bold";


    document.body.appendChild(
        message
    );


    setTimeout(
        () => {

            message.remove();

        },
        1300
    );
}


/* =====================================
   ANIMATION
===================================== */

function animate() {

    requestAnimationFrame(
        animate
    );


    if (playing) {

        updatePlayer();

        updateEnemies();

        updateTimer();


        if (
            shootTimer > 0
        ) {

            shootTimer--;
        }


        if (
            shooting
        ) {

            shoot();
        }
    }


    renderer.render(
        scene,
        camera
    );
}


/* =====================================
   RESIZE
===================================== */

function resize() {

    camera.aspect =
        innerWidth /
        innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        innerWidth,
        innerHeight
    );
}


/* =====================================
   START
===================================== */

init();
