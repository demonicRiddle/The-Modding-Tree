addLayer("w", {
        name: "wackiness", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
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
            if (hasUpgrade(this.layer, 41)) mult = mult.times(upgradeEffect(this.layer, 41))
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "w", description: "W: Reset for wacky points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 5,
            cols: 3,
            11: {
                title: "Begin Wackiness",
                description: "Gain 1 Point per second.",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            },
            21: {
                title: "One Hundredth",
                description: "Gain one hundredth of a point for every wacky point.",
                cost: new Decimal(1),
                effect() { // Calculate bonuses from the upgrade. Can return a single value or an object with multiple values
                    let ret = player[this.layer].points.times(0.01)
                    if (hasUpgrade(this.layer, 42)) ret = ret.pow(2)
                    if (ret.gte("100")) ret = ret.sqrt().times("10")
                    if (ret.gte("1e7")) ret = ret.sqrt().times("100")
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 11))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            22: {
                title: "Two Hundredths",
                description: "Gain two hundredths of a point for every wacky point.",
                cost: new Decimal(2),
                effect() {
                    let ret = player[this.layer].points.times(0.02)
                    if (hasUpgrade(this.layer, 42)) ret = ret.pow(2)
                    if (ret.gte("100")) ret = ret.sqrt().times("10")
                    if (ret.gte("1e7")) ret = ret.sqrt().times("100")
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 21))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            31: {
                title: "Three Hundredths",
                description: "Gain three hundredths of a point for every wacky point.",
                cost: new Decimal(3),
                effect() {
                    let ret = player[this.layer].points.times(0.03)
                    if (hasUpgrade(this.layer, 51)) ret = ret.pow(2)
                    if (ret.gte("50000")) ret = ret.sqrt().times("10")
                    if (ret.gte("1e7")) ret = ret.sqrt().times("100")
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 22))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            32: {
                title: "Four Hundredths",
                description: "Gain four hundredths of a point for every wacky point.",
                cost: new Decimal(4),
                effect() {
                    let ret = player[this.layer].points.times(0.04)
                    if (hasUpgrade(this.layer, 51)) ret = ret.pow(2)
                    if (ret.gte("100000")) ret = ret.sqrt().times("10")
                    if (ret.gte("1e7")) ret = ret.sqrt().times("100")
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 31))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            33: {
                title: "Five Hundredths",
                description: "Gain five hundredths of a point for every wacky point.",
                cost: new Decimal(5),
                effect() {
                    let ret = player[this.layer].points.times(0.05)
                    if (hasUpgrade(this.layer, 51)) ret = ret.pow(2)
                    if (ret.gte("100000")) ret = ret.sqrt().times("10")
                    if (ret.gte("1e7")) ret = ret.sqrt().times("100")
                    return ret;
                },
                unlocked() { return (hasUpgrade(this.layer, 32))},
                effectDisplay() { return "+"+format(this.effect()) },
            },
            41: {
                title: "Point Boosting",
                description: "Points boost wacky point gain.",
                cost: new Decimal(20),
                effect() {
                    let ret = player.points.max(10).log10().root(2)
                    return ret
                },
                unlocked() { return (hasUpgrade(this.layer, 33))},
                effectDisplay() { return +format(this.effect())+"x" },
            },
            42: {
                title: "Squares!",
                description: "Square the second row.",
                cost: new Decimal(10000),
                unlocked() { return (hasUpgrade(this.layer, 41))},
            },
            51: {
                title: "More of them!",
                description: "Square the third row.",
                cost: new Decimal(1e6),
                unlocked() { return (hasUpgrade(this.layer, 42))},
            },
            doReset(resettingLayer){ // Triggers when this layer is being reset, along with the layer doing the resetting. Not triggered by lower layers resetting, but is by layers on the same row.
                if(layers[resettingLayer].row > this.row) layerDataReset(this.layer, ["upgrades", "challenges"]) // This is actually the default behavior
            },
            layerShown() {return true}, // Condition for when layer appears on the tree
            resetsNothing() {return false},
            onPrestige(gain) {
                return
            },
        }
    }
)
addLayer("r", {
        layer: "r",
        name: "replicators",
        symbol: "R",
        position: "0",
        startData() { return {
            unlocked: true,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }},
        color: "#8c931a",
        requires: new Decimal(1e6), // Can be a function that takes requirement increases into account
        resource: "replicators", // Name of prestige currency
        baseResource: "wacky points", // Name of resource prestige is based on
        baseAmount() {return player.w.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.125, // Prestige currency exponent
        base: 2,
        roundUpCost: false, // True if the cost needs to be rounded up (use when baseResource is static?)
        canBuyMax() {}, // Only needed for static layers with buy max
        effect(){
            let a = player.r.points

            let ret = a.plus(1).pow(Math.log(4)/Math.log(3))
            if (ret.gt(1e10)) ret = ret.log10().pow(10)
            if (ret.gt(1e25)) ret = ret.log10().times(4000).pow(5)
            
            return ret
        },
        effectDescription(){
            return "which multiply point gain by " + formatWhole(layers.r.effect())
        },
        getResetGain() {
            return getResetGain(this.layer, useType = "static")
        },
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            return new Decimal(1)
        },
        row: 1,
        layerShown() {return player.w.points.gt(1e5) || player.r.best.gt(0)}, 
        branches: ["w"], // When this layer appears, a branch will appear from this layer to any layers here. Each entry can be a pair consisting of a layer id and a color.
        hotkeys: [
            {key: "r", description: "R: Reset for replicators", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
})