addLayer("w", {
        name: "wackiness", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
			points: new Decimal(0),
        }},
        color: "#2a72a8",
        requires: new Decimal(10), // Can be a function that takes requirement increases into account
        resource: "wacky points", // Name of prestige currency
        baseResource: "points", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 1, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "w", description: "Reset for wacky points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 2,
            cols: 6,
            11: {
                title: "Begin Wackiness",
                description: "Gain 1 Point per second.",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            },
            12: {
                title: "One Hundredth",
                description: "Gain one hundredth of a point for every wacky point.",
                cost: new Decimal(2),
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player[this.layer].points.times(0.01)
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 11))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            13: {
                title: "Two Hundredths",
                description: "Gain two hundredths of a point for every wacky point.",
                cost: new Decimal(3),
                effect() {
                    let ret = player[this.layer].points.times(0.02)
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 12))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            14: {
                title: "Three Hundredths",
                description: "Gain three hundredths of a point for every wacky point.",
                cost: new Decimal(4),
                effect() {
                    let ret = player[this.layer].points.times(0.03)
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 13))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            15: {
                title: "Four Hundredths",
                description: "Gain four hundredths of a point for every wacky point.",
                cost: new Decimal(5),
                effect() {
                    let ret = player[this.layer].points.times(0.04)
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 14))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            16: {
                title: "Five Hundredths",
                description: "Gain five hundredths of a point for every wacky point.",
                cost: new Decimal(6),
                effect() {
                    let ret = player[this.layer].points.times(0.05)
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 15))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            21: {
                title: "Self Boosting",
                description: "Points boost themselves at a reduced amount.",
                cost: new Decimal(20),
                effect() {
                    let ret = player.points.times(1).sqrt(-1)
                    if (ret.gte("10")) ret = ret.sqrt().times("0.5")
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 16))},
                effectDisplay() { return +format(this.effect())+"x" },
            },
        }
    }
)