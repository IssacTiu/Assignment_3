var master = 0;

var treeIndex = 0;
var treeStages = [
    "assests/seed.png",
    "assests/sprout.png",
    "assests/sapling.png",
    "assests/tree.png"];

var fishIndex = 0;
var fishStages = [
    "assests/fish_leg2.png",
    "assests/fish_leg1.png"];

var soulIndex = 0;
var soulStages = [
    "assests/soul-pile1.png",
    "assests/soul-pile2.png",
    "assests/soul-pile3.png",
    "assests/soul-pile4.png"];

var deadIndex = 0;
var deadStages = [
    "assests/tree_dead.png",
    "assests/tree_dead1.png",
    "assests/tree_dead2.png",
    "assests/tree_dead3.png",
    "assests/tree_dead4.png",
    "assests/tree_dead5.png"];

var extraIndex = 0;
var extraStages = [
    "assests/cage.png"];

var waterCount = 0;
var rand;
var filter;

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateImage(array, index) {
    $("#tree-image").attr("src", array[index]);
    $("#tree-image").attr("alt", "Tree at stage " + treeIndex);
}

async function flashImage() {
    $("#tree-image").attr("src", "assests/eyes.png");
    $("html").css("filter", "sepia(.5) contrast(1.3) brightness(0.9)");
    switch (randomInt(3)) {
        case 0:
            $("header h1").html("The Past is not dead");
            break;
        case 1:
            $("header h1").html("It is not even past");
            break;
        case 2:
            $("header h1").html("Grow or Die");
            break;
    }
    await sleep(150);
    $("html").css("filter", "none");
    $("header h1").html("Grow a Tree");
}

function changeMaster(i) {
    master = i;
    switch (master) {
        case 0:
            $("#tree-image").attr("src", "assests/seed.png");
            break;
        case 1:
            $("#tree-image").attr("src", "assests/fish.png");
            break;
        case 2:
            extraIndex = 0;
            if (extraIndex == 0) {
                $("html").css("transition", ".5s");
                $("#tree-image").attr("src", deadStages[0]);
            } else {
                $("#tree-image").attr("src", extraStages[0]);
            }
            break;
        case 3:
            filter = 0;
            $("html").css("filter", "grayscale(1) contrast(1.2) brightness(0.8)");
            $("#tree-image").attr("src", "assests/soul-pile1.png");
            break;
    }
}

async function treeTouch() {
    $("#tree-image").css("transform", "scale(1.15, .85)");
    await sleep(100);
    $("#tree-image").css("transform", "scale(1.0)");
}

$(".button").on("mouseover", function () {
    $(this).css("background-color", "#4CAF50");
});

$(".button").on("mouseout", function () {
    $(this).css("background-color", "#fffaad");
});

$("#tree-image").on("click", async function () {
    waterCount++;
    treeTouch();

    switch (master) {
        case 0:
            if (waterCount % 4 == 0) {
                if (treeIndex < treeStages.length - 2) {
                    treeIndex++;
                    updateImage(treeStages, treeIndex);
                } else {
                    if (randomInt(10) == 0) {
                        treeIndex++;
                        updateImage(treeStages, treeIndex);
                    } else {
                        treeIndex = 0;
                        waterCount = 0;
                        await flashImage();
                        changeMaster(randomInt(4));
                    }
                }
            }
            break;

        case 1:
            if (waterCount != 8) {
                if (fishIndex < fishStages.length - 1) {
                    fishIndex++;
                } else {
                    fishIndex--;
                }
                updateImage(fishStages, fishIndex);
            } else {
                fishIndex = 0;
                waterCount = 0;
                await flashImage();
                changeMaster(randomInt(4));
            }
            break;
        case 2:
            if (extraIndex == 0) {
                if (waterCount != 6) {
                    updateImage(deadStages, waterCount);
                    $("html").css("filter", "sepia(.5) brightness(1.5) contrast(1.1)");
                    await sleep(500);
                    $("html").css("filter", "none");
                } else {
                    waterCount = 0;
                    $("html").css("transition", "none");
                    $("html").css("filter", "none");
                    await flashImage();
                    changeMaster(randomInt(4));
                }
            } else {
                if (waterCount != 6) {
                    $("#harvey")[0].currentTime = 0;
                    $("#harvey")[0].play();
                } else {
                    waterCount = 0;
                    await flashImage();
                    changeMaster(randomInt(4));
                }
            }
            break;
        case 3:
            if (waterCount != 11) {
                if (soulIndex < soulStages.length - 1) {
                    soulIndex++;
                    updateImage(soulStages, soulIndex);
                } else {
                    $("#tree-image").css("animation", "shake 0.1s infinite");
                    filter += 0.1;
                    $("html").css("filter", "grayscale(1) contrast(" + (1.2 + filter * 2) + ") brightness(" + (0.8 - filter) + ")");
                }
            } else {
                soulIndex = 0;
                waterCount = 0;
                $("#tree-image").css("animation", "none");
                $("html").css("filter", "none");
                await flashImage();
                changeMaster(randomInt(4));
            }
            break;
    }


});

$("#reset-btn").on("click", function () {
    treeIndex = 0;
    waterCount = 0;
    master = 0;
    $("#tree-image").attr("src", treeStages[treeIndex]);
    $("#tree-image").attr("alt", "Tree at stage " + treeIndex);
});
