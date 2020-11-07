// http://www.christianfaur.com/conceptual/colorAlphabet/image3.html for other prestige layers
// NOTE TO SELF: Don't name the layers greek letters or you can't save

addLayer("a", {
        name: "A", // This is optional, only used in a few places, If absent it just uses the layer id.
        symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
        position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }},
        color: "#1e33c8",
        requires() { return new Decimal(10) }, // Can be a function that takes requirement increases into account
        resource: "A's", // Name of prestige currency
        baseResource: "letters", // Name of resource prestige is based on
        baseAmount() {return player.points}, // Get the current amount of baseResource
        type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
        exponent: 0.5, // Prestige currency exponent
        gainMult() { // Calculate the multiplier for main currency from bonuses
            mult = new Decimal(1)
            if (hasUpgrade(this.layer, 13)) mult = mult.times(upgradeEffect(this.layer, 13))
            if (hasUpgrade(this.layer, 22)) mult = mult.times(upgradeEffect(this.layer, 22))
            mult = mult.times(layers.aa.effect())
            return mult
        },
        gainExp() { // Calculate the exponent on main currency from bonuses
            exp = new Decimal(1)
            return exp
        },
        row: 0, // Row the layer is in on the tree (0 is the first row)
        hotkeys: [
            {key: "a", description: "Press A to reset for letter A's", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
        layerShown(){return true},
        upgrades: {
            rows: 5,
            cols: 3,
            11: {
                title: "The First Letter",
                description: "Gain 1 A per second.",
                cost: new Decimal(1),
                unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true
            },
            12: {
                title: "A Boost",
                description: "A boosts letter gain.",
                cost: new Decimal(1),
                effect() {
					let eff = player.a.points.plus(1).pow(0.585);
					if (eff.gte("1e3500")) eff = eff.log10().times(Decimal.div("1e3500", 3500));
					return eff;
				},
				unlocked() { return hasUpgrade("a", 11) },
				effectDisplay() { return format(this.effect())+"x" },
            },
            13: {
                title: "Letter Boost",
                description: "Letters boosts A gain.",
                cost: new Decimal(5),
                effect() {
                    let eff = player.points.max(10).log10().root(1);
                    if (eff.gte("1e3500")) eff = eff.log10().times(Decimal.div("1e3500", 3500));
                    return eff;
                },
                unlocked() { return hasUpgrade("a", 12)},
                effectDisplay() { return format(this.effect())+"x"},
            },
            21: {
                title: "Letter Self-Boost",
                description: "Letters boost letter gain.",
                cost: new Decimal(20),
                effect() {
                    let eff = player.points.max(10).log10().root(1);
                    if (eff.gte("1e3500")) eff = eff.log10().times(Decimal.div("1e3500", 3500));
                    return eff;
                },
                unlocked() { return hasUpgrade("a", 13)},
                effectDisplay() { return format(this.effect())+"x"},
            },
            22: {
                title: "A Self-Boost",
                description: "A boosts A gain.",
                cost: new Decimal(100),
                effect() {
                    let eff = player.a.points.plus(1).pow(0.3225);
                    if (eff.gte("1e3500")) eff = eff.log10().times(Decimal.div("1e3500", 3500));
                    return eff;
                },
                unlocked() { return hasUpgrade("a", 21)},
                effectDisplay() { return format(this.effect())+"x"},
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
addLayer("aa", {
    layer: "aa",
    name: "α",
    symbol: "α",
    position: "1",
    startData() { return {
        unlocked: false,
        points: new Decimal(0),
        best: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#0062d1",
    requires() { return new Decimal(300).times((player.b.unlocked)?5000:1) }, 
    resource: "α's", 
    baseResource: "A's", 
    baseAmount() {return player.a.points}, 
    type: "static", 
    exponent: 2, 
    base: 2,
    roundUpCost: false, 
    canBuyMax() {}, 
    effect(){
        let a = player.aa.points
        let ret = a.plus(1).pow(Math.log(4)/Math.log(3))
        if (ret.gt(1e10)) ret = ret.log10().pow(10)
        if (ret.gt(1e25)) ret = ret.log10().times(4000).pow(5)
        return ret
    },
    effectDescription(){
        return "which multiplies A gain by " + formatWhole(layers.aa.effect())
    },
    getResetGain() {
        return getResetGain(this.layer, useType = "static")
    },
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    row: 1,
    layerShown() {return player.a.unlocked}, 
    branches: ["a"], 
    hotkeys: [
        {key: "ctrl+a", description: "Press CTRL+A to reset for letter α's", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
})
addLayer("b", {
        layer: "b",
        name: "B",
        symbol: "B",
        position: "0",
        startData() { return {
            unlocked: false,
            points: new Decimal(0),
            best: new Decimal(0),
            total: new Decimal(0),
        }},
        color: "#af0d66",
        requires() { return new Decimal(300).times((player.aa.unlocked)?5000:1) }, 
        resource: "B's", 
        baseResource: "A's", 
        baseAmount() {return player.a.points}, 
        type: "static", 
        exponent: 2, 
        base: 2,
        roundUpCost: false, 
        increaseUnlockOrder: ["aa"],
        canBuyMax() {}, 
        effect(){
            let a = player.b.points
            let ret = a.plus(1).pow(Math.log(4)/Math.log(3))
            if (ret.gt(1e10)) ret = ret.log10().pow(10)
            if (ret.gt(1e25)) ret = ret.log10().times(4000).pow(5) 
            return ret
        },
        effectDescription(){
            return "which multiply letter gain by " + formatWhole(layers.b.effect())
        },
        getResetGain() {
            return getResetGain(this.layer, useType = "static")
        },
        gainMult() { 
            mult = new Decimal(1)
            return mult
        },
        gainExp() { 
            return new Decimal(1)
        },
        row: 1,
        layerShown() {return player.a.unlocked}, 
        branches: ["a"], 
        hotkeys: [
            {key: "b", description: "Press B to reset for letter B's", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
        ],
})