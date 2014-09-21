/*globals _, data */
var DataFixer = (function () {
    'use strict';
    var DataFixer = function () {
    };

    var dataFixed = false,
        dataCorrections = [];

    function getMovesByPlayerId(moves, playerId, callback) {
        playerId = parseInt(playerId, 10);

        _.each(moves, function (value) {
            if (value.id === playerId) {
                return callback(value);
            }
        });
    }

    function getItemGroupByName(playerMoves, itemGroupName, callback) {
        _.each(playerMoves.itemGroups, function (itemGroup) {
            if (itemGroup.name === itemGroupName) {
                return callback(itemGroup);
            }
        });
    }

    function getItemByName(itemGroup, itemName, callback) {
        _.each(itemGroup.items, function (item) {
            if (item.name === itemName) {
                return callback(item);
            }
        });
    }

    function setDamage(item, value) {
        if (typeof item.damage === 'string' && item.damage.indexOf('?') >= 0) {
            item.damage = value + '%';
        } else if (typeof item.damage === 'string' && item.damage === '') {
            item.damage = value + '%';
        } else if (_.isUndefined(item)) {
            item.damage = value + '%';
        }
    }

    dataCorrections.push(function (playerMoves) {
        // correct cyber sub-zero "cry bomb" special enhanced attack
        getMovesByPlayerId(playerMoves, 5, function (moves) {
            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                itemGroup.items[2].name = 'Cry Bomb';
                itemGroup.items[3].name = 'Cry Bomb';
                itemGroup.items[4].name = 'Cry Bomb';
            });
        });
    });

    dataCorrections.push(function (playerMoves) {
        // correct cyrax "sticky bomb" special enhanced attack
        getMovesByPlayerId(playerMoves, 6, function (moves) {
            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                itemGroup.items.shift();
                itemGroup.items.unshift({ 'name': 'Sticky Bomb (Far)', 'damage': '8%', 'buttons': ['b', 'b', 'f', 'p', '4', 'p', 'l']  });
                itemGroup.items.unshift({ 'name': 'Sticky Bomb (Medium)', 'damage': '8%', 'buttons': ['f', 'f', 'p', '4', 'p', 'l']  });
                itemGroup.items.unshift({ 'name': 'Sticky Bomb (Close)', 'damage': '8%', 'buttons': ['b', 'b', 'p', '4', 'p', 'l']  });
            });
        });
    });

    dataCorrections.push(function (playerMoves) {
        // correct shang tsung "ground eruption" and "skull storm" special enhanced attacks
        getMovesByPlayerId(playerMoves, 29, function (moves) {
            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                itemGroup.items[2].name = 'Ground Eruption';
                itemGroup.items[3].name = 'Ground Eruption';
                itemGroup.items[5].name = 'Skull Storm';
                itemGroup.items[6].name = 'Skull Storm';
            });
        });
    });

    dataCorrections.push(function (playerMoves) {
        // correct noob saibot "blackhole" special enhanced attacks
        getMovesByPlayerId(playerMoves, 22, function (moves) {
            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                itemGroup.items[2].name = 'Blackhole';
                itemGroup.items[3].name = 'Blackhole';
                itemGroup.items[4].name = 'Blackhole';
            });
        });
    });

    dataCorrections.push(function (playerMoves) {
        // correct kung lao "teleport" special attacks
        getMovesByPlayerId(playerMoves, 3, function (moves) {
            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                for (var itemKey in itemGroup.items) {
                    if (itemGroup.items.hasOwnProperty(itemKey)) {
                        itemGroup.items[itemKey].name = itemGroup.items[itemKey].name.replace(/&#160;/g, '');
                    }
                }
            });
        });
    });

    dataCorrections.push(function (playerMoves) {
        // correct missing damage info
        getMovesByPlayerId(playerMoves, 4, function (moves) { //baraka
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Tarkatan Rush', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Painful Swipes', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Tricky Fury', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Cut Em Loose', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Splinter', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Cold Steel', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Tears of Pain', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Tarkatan Push', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Horror Show', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Outworld Bash', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Tarkatan Blows', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Open Wound', function (item) { setDamage(item, 19); });
                getItemByName(itemGroup, 'Easy Kill', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Doom Kills', function (item) { setDamage(item, 11); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Blade Charge', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Spark', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Chop Chop', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Blade Spin', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Slices', function (item) { setDamage(item, 10); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Blade Rush', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Sparked', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Chopchop Shop', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Spinner', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Slicer', function (item) { setDamage(item, 14); });
            });
        });

        getMovesByPlayerId(playerMoves, 5, function (moves) { //cyber sub zero
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Cyborg Assault', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Automation', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Drive Power', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Freezing Pain', function (item) { setDamage(item, 19); });
                getItemByName(itemGroup, 'Cryo Bash', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Frost', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Wildcard', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Upload', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Reboot', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Nano Smash', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'System Error', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Blizzard', function (item) { setDamage(item, 16); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Ice Bomb (Close)', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Ice Bomb (Medium)', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Ice Bomb (Far)', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Ice Ball', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Slide', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Ice Parry', function (item) { setDamage(item, 8); });
                //getItemByName(itemGroup, 'Teleport', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Divekick (Close)', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Divekick (Far)', function (item) { setDamage(item, 7); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                //getItemByName(itemGroup, 'Ice Beam', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Cyber Slide', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Cry Bomb', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Bangport', function (item) { setDamage(item, 8); });
                //getItemByName(itemGroup, 'Frozen Parry', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Power Kick (Close)', function (item) { setDamage(item, 18); });
                getItemByName(itemGroup, 'Power Kick (Far)', function (item) { setDamage(item, 18); });
            });
        });

        getMovesByPlayerId(playerMoves, 11, function (moves) { //jax
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Major Force', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Active Duty', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Boot Kamp', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Field Grade', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Advance Force', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Code of Conduct', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Chain of Command', function (item) { setDamage(item, 15); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Energy Wave', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Dash Punch', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Ground Pound (Close)', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Ground Pound (Medium)', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Ground Pound (Far)', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Air Gotcha Grab', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Overhead Smash', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Gotcha Grab', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Back Breaker', function (item) { setDamage(item, 3); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Assault Wave', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Ground Quake', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Dash Fist', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Gotcha Beatdown', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Air Gotcha Blast', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Elite Smash', function (item) { setDamage(item, 15); });
            });
        });

        getMovesByPlayerId(playerMoves, 13, function (moves) { //kabal
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Last Breath', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Mutilation', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Extermination', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Vanquish', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Nomad\'s Fear', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Eviscerate', function (item) { setDamage(item, 15); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Fireball', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Buzzsaw', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Tornado Slam', function (item) { setDamage(item, 11); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Fireball', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Saw Blades', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Cyclone Slam', function (item) { setDamage(item, 15); });
            });
        });

        getMovesByPlayerId(playerMoves, 15, function (moves) { //kenshi
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Telekinetic Rush', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Blind Justice', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Off Balance', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Heightened Senses', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Stolen Soul', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Absentminded', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Shortsighted', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Brainpower', function (item) { setDamage(item, 11); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Spirit Charge', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Rising Karma', function (item) { setDamage(item, 5); });
                getItemByName(itemGroup, 'Telekinetic Slash (Close)', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Telekinetic Slash (Medium)', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Telekinetic Slash (Far)', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Tele-Flurry', function (item) { setDamage(item, 9); });
                //getItemByName(itemGroup, 'Blade Reflect', function (item) { setDamage(item, 9); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Spirit Vengeance', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Karma Eruption', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Telekinetic Blade (Close)', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Telekinetic Blade (Medium)', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Telekinetic Blade (Far)', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Tele-Beatdown', function (item) { setDamage(item, 13); });
                //getItemByName(itemGroup, 'Blade Absorb', function (item) { setDamage(item, 13); });
            });
        });

        getMovesByPlayerId(playerMoves, 24, function (moves) { //raiden
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Heavenly Hand', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Sudden Energy', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'White Lightning', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Violent Thunder', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Quick Burn', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Flash Storm', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Spark Kicks', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Thunder God', function (item) { setDamage(item, 12); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Lightning', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Electrocute', function (item) { setDamage(item, 8); });
                //getItemByName(itemGroup, 'Teleport', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Torpedo', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Vicinity Blast', function (item) { setDamage(item, 7); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Bolt', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Shocker', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Torpedo', function (item) { setDamage(item, 10); });
                //getItemByName(itemGroup, 'Sparkport', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Vicinity Burst', function (item) { setDamage(item, 10); });
            });
        });

        getMovesByPlayerId(playerMoves, 29, function (moves) { //shang tsung
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Bad Omen', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Soul Stain', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Soul Torment', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Death Walker', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Reserved Pain', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Restored Youth', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Playtime', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Deadly Truth', function (item) { setDamage(item, 14); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Fire Skull', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Soul Steal', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Up Skull (Above)', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Up Skull (Behind)', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Up Skull (Front)', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Ground Skull (Close)', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Ground Skull (Medium)', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Ground Skull (Far)', function (item) { setDamage(item, 9); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Triple Skull', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Ground Eruption', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Skull Storm', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Soul Capture', function (item) { setDamage(item, 16); });
            });
        });

        getMovesByPlayerId(playerMoves, 30, function (moves) { //sheeva
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Shokan Fury', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Blood Lust', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Darkness', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Quad Toss', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Four Way', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Sheeva Rush', function (item) { setDamage(item, 17); });
                getItemByName(itemGroup, 'Demolish', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Turmoil', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Rehabilitated', function (item) { setDamage(item, 15); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Ground Pound', function (item) { setDamage(item, 9); });
            });
        });

        getMovesByPlayerId(playerMoves, 32, function (moves) { //skarlet
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Krimson Bash', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Red Pain', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Blood Cot', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Coagulation', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Bad Blood', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Bloody Murder', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Bloodshed', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Punishment', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Bloodshot', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Flesh and Blood', function (item) { setDamage(item, 19); });
                getItemByName(itemGroup, 'Blood Boil', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Slaughter', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Carnage', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Thicker than Water', function (item) { setDamage(item, 13); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Up Slash', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Down Slash', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Blood Drop', function (item) { setDamage(item, 8); });
                //getItemByName(itemGroup, 'Red Dash', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Red Slide', function (item) { setDamage(item, 1); });
                //getItemByName(itemGroup, 'Up Slash', function (item) { setDamage(item, 9); });
                //getItemByName(itemGroup, 'Down Slash', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Blood Ball', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Dagger Toss', function (item) { setDamage(item, 7); });
                getItemByName(itemGroup, 'Air Dagger (Close)', function (item) { setDamage(item, 4); });
                getItemByName(itemGroup, 'Air Dagger (Far)', function (item) { setDamage(item, 4); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Dual Up Slash', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Dual Down Slash', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Blood Stomp', function (item) { setDamage(item, 5); });
                //getItemByName(itemGroup, 'Krimson Dash', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Red Slide', function (item) { setDamage(item, 1); });
                //getItemByName(itemGroup, 'Dual Up Slash', function (item) { setDamage(item, 15); });
                //getItemByName(itemGroup, 'Dual Down Slash', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Double Dagger', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Tri Air Dagger (Close)', function (item) { setDamage(item, 4); });
                getItemByName(itemGroup, 'Tri Air Dagger (Far)', function (item) { setDamage(item, 4); });
            });
        });

        getMovesByPlayerId(playerMoves, 34, function (moves) { //sony
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Advance Force', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Fierce Assault', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Drop Zone', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Ground Control', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Power Rush', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Mess Hall', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Playtime', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Beat Up', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'Pull Out', function (item) { setDamage(item, 7); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Energy Ring Blast', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Leg Grab', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Kartwheel', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Kiss', function (item) { setDamage(item, 1); });
                getItemByName(itemGroup, 'Arc Kick', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Air Throw', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Air Drop', function (item) { setDamage(item, 7); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Rings of Justice', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Krazy Legs', function (item) { setDamage(item, 19); });
                getItemByName(itemGroup, 'Arc Wave', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Kartwheel Bash', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Deadly Kiss', function (item) { setDamage(item, 1); });
                getItemByName(itemGroup, 'Air Strikes', function (item) { setDamage(item, 3); });
            });
        });

        getMovesByPlayerId(playerMoves, 26, function (moves) { //stryker
            getItemGroupByName(moves, 'Kombo Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Cop Out', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Dispatched', function (item) { setDamage(item, 11); });
                getItemByName(itemGroup, 'Beatdown', function (item) { setDamage(item, 10); });
                getItemByName(itemGroup, 'Pain Patrol', function (item) { setDamage(item, 15); });
                getItemByName(itemGroup, 'The Heat', function (item) { setDamage(item, 16); });
                getItemByName(itemGroup, 'Aggravated Assault', function (item) { setDamage(item, 12); });
                getItemByName(itemGroup, 'Spread em', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Come with me', function (item) { setDamage(item, 13); });
            });

            getItemGroupByName(moves, 'Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'High Grenade Toss', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Low Grenade Toss', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Baton Sweep', function (item) { setDamage(item, 9); });
                getItemByName(itemGroup, 'Gun Shot', function (item) { setDamage(item, 6); });
                getItemByName(itemGroup, 'Roll Toss', function (item) { setDamage(item, 12); });
            });

            getItemGroupByName(moves, 'Enhanced Special Attacks', function (itemGroup) {
                getItemByName(itemGroup, 'Baton Bash', function (item) { setDamage(item, 14); });
                getItemByName(itemGroup, 'Double Grenade', function (item) { setDamage(item, 13); });
                getItemByName(itemGroup, 'Bang Bang', function (item) { setDamage(item, 8); });
                getItemByName(itemGroup, 'Roll Out', function (item) { setDamage(item, 16); });
            });
        });

    });

    DataFixer.prototype.applyCorrections = function (playerMoves) {
        if (dataFixed === false) {
            _.each(dataCorrections, function (func) { func(playerMoves); });
            dataFixed = true;
        }
    };

    return DataFixer;
}());