const MAX_HP = 30;
const MAX_ENERGY = 10;
const HAND_LIMIT = 7;
const LANES = 3;
const DECK_SIZE = 20;

const CARD_POOL = [
  // Units
  { id: "iron-guard", name: "Iron Guard", type: "unit", cost: 2, atk: 2, hp: 3, tags: ["guard"] },
  { id: "flame-adept", name: "Flame Adept", type: "unit", cost: 2, atk: 3, hp: 2, tags: [] },
  { id: "archer", name: "Archer", type: "unit", cost: 2, atk: 2, hp: 1, tags: ["anyLane"] },
  { id: "stone-titan", name: "Stone Titan", type: "unit", cost: 7, atk: 6, hp: 8, tags: [] },
  { id: "ward-knight", name: "Ward Knight", type: "unit", cost: 3, atk: 2, hp: 5, tags: ["guard"] },
  { id: "swift-raider", name: "Swift Raider", type: "unit", cost: 2, atk: 2, hp: 1, tags: ["swift"] },
  { id: "iron-captain", name: "Iron Captain", type: "unit", cost: 3, atk: 3, hp: 4, tags: [] },
  { id: "nightblade", name: "Nightblade", type: "unit", cost: 4, atk: 5, hp: 2, tags: ["swift"] },
  // Spells
  { id: "firebolt", name: "Firebolt", type: "spell", cost: 2, text: "Deal 3 damage to any target." },
  { id: "rally", name: "Rally", type: "spell", cost: 2, text: "All allies gain +1 ATK this turn." },
  { id: "mend", name: "Mend", type: "spell", cost: 3, text: "Heal 4 HP." },
  { id: "spark", name: "Spark", type: "spell", cost: 1, text: "Deal 2 damage to any target." },
  { id: "draw-two", name: "Draw Two", type: "spell", cost: 2, text: "Draw 2 cards." },
  { id: "reinforce", name: "Reinforce", type: "spell", cost: 2, text: "Give a unit +2/+2 this turn." },
  // Relics
  { id: "war-banner", name: "War Banner", type: "relic", cost: 1, text: "Your units get +1 ATK." },
  { id: "mana-well", name: "Mana Well", type: "relic", cost: 1, text: "Once: gain +1 max energy cap this game." },
  { id: "healing-totem", name: "Healing Totem", type: "relic", cost: 1, text: "End turn: heal hero 1." },
  { id: "banner-might", name: "Banner of Might", type: "relic", cost: 2, text: "Your units get +1/+1." },
  { id: "mana-pebble", name: "Mana Pebble", type: "relic", cost: 1, text: "First spell each turn costs 1 less." },
  { id: "training-grounds", name: "Training Grounds", type: "relic", cost: 1, text: "Units you play gain +1 HP." },
  { id: "scouts-lens", name: "Scout’s Lens", type: "relic", cost: 1, text: "You see opponent’s next draw." },
  { id: "ember-charm", name: "Ember Charm", type: "relic", cost: 1, text: "Burn effects deal +1 damage." },
  { id: "thorn-idol", name: "Thorn Idol", type: "relic", cost: 1, text: "When your hero takes damage, deal 1 back." },
  { id: "swift-emblem", name: "Swift Emblem", type: "relic", cost: 1, text: "First unit each turn gains Swift." },
  { id: "steel-token", name: "Steel Token", type: "relic", cost: 1, text: "Your Guards gain +1 HP." },
  { id: "echo-shard", name: "Echo Shard", type: "relic", cost: 1, text: "First spell you cast each game repeats." },
  { id: "crystal-battery", name: "Crystal Battery", type: "relic", cost: 2, text: "Gain 1 extra energy next turn." },
  { id: "grave-sigil", name: "Grave Sigil", type: "relic", cost: 2, text: "When a unit dies, heal 1." },
  { id: "war-drum", name: "War Drum", type: "relic", cost: 2, text: "Units gain +1 ATK the turn they’re played." },
  { id: "frost-idol", name: "Frost Idol", type: "relic", cost: 2, text: "First enemy to attack each turn is Frozen." },
  { id: "arcane-scroll", name: "Arcane Scroll", type: "relic", cost: 2, text: "Draw 1 when you play a relic." },
  { id: "blood-medallion", name: "Blood Medallion", type: "relic", cost: 2, text: "When you heal, give +1 ATK to a unit." },
  { id: "siege-standard", name: "Siege Standard", type: "relic", cost: 2, text: "Your units deal +1 damage to enemy hero." },
  { id: "twin-sigil", name: "Twin Sigil", type: "relic", cost: 2, text: "When you summon a 1-cost unit, summon another." },
  { id: "shadow-veil", name: "Shadow Veil", type: "relic", cost: 2, text: "Your damaged units gain +1 ATK." },
  { id: "crown-command", name: "Crown of Command", type: "relic", cost: 3, text: "Units gain +1 ATK per relic played." },
  { id: "ember-crown", name: "Ember Crown", type: "relic", cost: 3, text: "Spells deal +1 damage." },
  { id: "spirit-lantern", name: "Spirit Lantern", type: "relic", cost: 3, text: "When a unit dies, draw a card." },
  { id: "iron-bastion", name: "Iron Bastion", type: "relic", cost: 3, text: "Your hero takes 1 less attack damage." },
  { id: "wild-totem", name: "Wild Totem", type: "relic", cost: 3, text: "Summoned units gain +1/+1." },
  { id: "rune-forge", name: "Rune Forge", type: "relic", cost: 3, text: "Reduce cost of 5+ cost units by 1." },
  { id: "mana-engine", name: "Mana Engine", type: "relic", cost: 3, text: "Gain +1 max energy." },
  { id: "echo-engine", name: "Echo Engine", type: "relic", cost: 3, text: "Every third spell repeats." },
  { id: "vampiric-idol", name: "Vampiric Idol", type: "relic", cost: 3, text: "Your hero heals 1 when your unit deals damage." },
  { id: "duelist-crest", name: "Duelist Crest", type: "relic", cost: 3, text: "Units alone in lane gain +2 ATK." },
  { id: "war-cathedral", name: "War Cathedral", type: "relic", cost: 4, text: "All allies gain +2 ATK." },
  { id: "glacial-core", name: "Glacial Core", type: "relic", cost: 4, text: "Enemies entering play are Frozen." },
  { id: "blood-forge", name: "Blood Forge", type: "relic", cost: 4, text: "Units that kill gain +2/+2." },
  { id: "sun-relic", name: "Sun Relic", type: "relic", cost: 4, text: "Heal all allies 1 each turn." },
  { id: "void-prism", name: "Void Prism", type: "relic", cost: 4, text: "When you cast a spell, deal 1 to all enemies." },
  { id: "legion-emblem", name: "Legion Emblem", type: "relic", cost: 4, text: "Your max unit slots increase to 4." },
  { id: "arcane-matrix", name: "Arcane Matrix", type: "relic", cost: 4, text: "First spell each turn costs 2 less." },
  { id: "storm-beacon", name: "Storm Beacon", type: "relic", cost: 4, text: "Playing 5+ cost card deals 2 to all enemies." },
  { id: "undying-sigil", name: "Undying Sigil", type: "relic", cost: 4, text: "First unit that dies each turn returns with 1 HP." },
  { id: "dominion-seal", name: "Dominion Seal", type: "relic", cost: 4, text: "Units gain +1/+1 when played." },
  { id: "crown-fury", name: "Crown of Fury", type: "relic", cost: 5, text: "Your units attack twice." },
  { id: "eternal-flame", name: "Eternal Flame", type: "relic", cost: 5, text: "Burn deals double damage." },
  { id: "obsidian-throne", name: "Obsidian Throne", type: "relic", cost: 5, text: "Hero gains +1 max HP when a unit dies." },
  { id: "relic-rebirth", name: "Relic of Rebirth", type: "relic", cost: 5, text: "First unit you play each turn gains Lifesteal." },
  { id: "world-anchor", name: "World Anchor", type: "relic", cost: 5, text: "Enemy spells cost 1 more." },
  { id: "time-relic", name: "Time Relic", type: "relic", cost: 5, text: "First card each turn repeats." },
  { id: "cataclysm-core", name: "Cataclysm Core", type: "relic", cost: 5, text: "Below 10 HP: deal 5 to all enemies." },
  { id: "ascension-crown", name: "Ascension Crown", type: "relic", cost: 5, text: "At 10 energy, units gain +3/+3." },
  { id: "infinite-forge", name: "Infinite Forge", type: "relic", cost: 5, text: "Units you play cost 1 less." },
  { id: "sovereigns-crown", name: "Sovereign’s Crown", type: "relic", cost: 6, text: "Your units gain +2/+2 and Guard." },
];

const STARTER_COUNTS = {
  "iron-guard": 4,
  "flame-adept": 3,
  archer: 2,
  "stone-titan": 1,
  firebolt: 3,
  rally: 3,
  mend: 2,
  "war-banner": 1,
  "mana-well": 1,
};

const el = {
  aiDifficulty: document.getElementById("aiDifficulty"),
  startBtn: document.getElementById("startBtn"),
  resetDeckBtn: document.getElementById("resetDeckBtn"),
  deckbuilder: document.getElementById("deckbuilder"),
  deckSummary: document.getElementById("deckSummary"),
  cardPool: document.getElementById("cardPool"),
  game: document.getElementById("game"),
  playerLanes: document.getElementById("playerLanes"),
  enemyLanes: document.getElementById("enemyLanes"),
  playerHand: document.getElementById("playerHand"),
  playerHp: document.getElementById("playerHp"),
  enemyHp: document.getElementById("enemyHp"),
  playerEnergy: document.getElementById("playerEnergy"),
  enemyEnergy: document.getElementById("enemyEnergy"),
  playerDeckCount: document.getElementById("playerDeckCount"),
  enemyDeckCount: document.getElementById("enemyDeckCount"),
  playerRelic: document.getElementById("playerRelic"),
  enemyRelic: document.getElementById("enemyRelic"),
  endTurnBtn: document.getElementById("endTurnBtn"),
  turnLabel: document.getElementById("turnLabel"),
  logLine: document.getElementById("logLine"),
  enemyZone: document.getElementById("enemyZone"),
  playerZone: document.getElementById("playerZone"),
};

let deckSelection = {};
let game = null;
let selectedAttacker = null;

function cardById(id) {
  return CARD_POOL.find((c) => c.id === id);
}
function cloneCard(card) {
  return JSON.parse(JSON.stringify(card));
}
function shuffled(list) {
  return [...list].sort(() => Math.random() - 0.5);
}
function unitPower(unit) {
  return (unit.atk || 0) + (unit.hp || 0);
}

function setupDeckBuilder() {
  deckSelection = { ...STARTER_COUNTS };
  renderCardPool();
  renderDeckSummary();
}

function renderCardPool() {
  el.cardPool.innerHTML = "";
  CARD_POOL.forEach((card) => {
    const count = deckSelection[card.id] || 0;
    const div = document.createElement("div");
    div.className = "pool-card";
    div.innerHTML = `
      <h4>${card.name}</h4>
      <div class="muted">${card.type.toUpperCase()} • Cost ${card.cost}</div>
      <div class="muted">${card.type === "unit" ? `${card.atk}/${card.hp}` : card.text}</div>
      <div class="pool-controls">
        <button data-op="dec" data-id="${card.id}">-</button>
        <strong>${count}</strong>
        <button data-op="inc" data-id="${card.id}">+</button>
      </div>
    `;
    el.cardPool.appendChild(div);
  });

  el.cardPool.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const op = btn.dataset.op;
      const total = deckCount();
      const current = deckSelection[id] || 0;
      if (op === "inc" && total < DECK_SIZE && current < 4) deckSelection[id] = current + 1;
      if (op === "dec" && current > 0) deckSelection[id] = current - 1;
      renderCardPool();
      renderDeckSummary();
    });
  });
}

function deckCount() {
  return Object.values(deckSelection).reduce((a, b) => a + b, 0);
}

function renderDeckSummary() {
  const total = deckCount();
  const counts = { unit: 0, spell: 0, relic: 0 };
  Object.entries(deckSelection).forEach(([id, n]) => {
    const c = cardById(id);
    counts[c.type] += n;
  });
  el.deckSummary.innerHTML = `
    <strong>Total:</strong> ${total}/${DECK_SIZE}
    • Units: ${counts.unit}
    • Spells: ${counts.spell}
    • Relics: ${counts.relic}
  `;
}

function buildDeckFromSelection() {
  const ids = [];
  Object.entries(deckSelection).forEach(([id, n]) => {
    for (let i = 0; i < n; i++) ids.push(id);
  });
  return shuffled(ids.map((id) => cloneCard(cardById(id))));
}

function createPlayerState(deck, isAI = false) {
  return {
    isAI,
    hp: MAX_HP,
    energy: 0,
    maxEnergy: 0,
    deck,
    hand: [],
    lanes: Array.from({ length: LANES }, () => null),
    relic: null,
    manaWellUsed: false,
  };
}

function startGame() {
  if (deckCount() !== DECK_SIZE) {
    alert(`Deck must have exactly ${DECK_SIZE} cards.`);
    return;
  }
  const player = createPlayerState(buildDeckFromSelection(), false);
  const enemy = createPlayerState(buildDeckFromSelection(), true);
  game = {
    player,
    enemy,
    turn: "player",
    difficulty: el.aiDifficulty.value,
    winner: null,
    turnBuffs: { playerAtk: 0, enemyAtk: 0 },
  };

  for (let i = 0; i < 3; i++) {
    drawCard(player, 1);
    drawCard(enemy, 1);
  }

  el.deckbuilder.classList.add("hidden");
  el.game.classList.remove("hidden");

  startTurn("player");
  render();
}

function drawCard(p, amount = 1) {
  for (let i = 0; i < amount; i++) {
    if (p.hand.length >= HAND_LIMIT || p.deck.length === 0) return;
    p.hand.push(p.deck.shift());
  }
}

function startTurn(side) {
  const p = side === "player" ? game.player : game.enemy;
  p.maxEnergy = Math.min(MAX_ENERGY, p.maxEnergy + 1);
  p.energy = p.maxEnergy;
  drawCard(p, 1);
  if (p.relic?.id === "healing-totem") p.hp = Math.min(MAX_HP, p.hp + 1);
  if (p.relic?.id === "mana-well" && !p.manaWellUsed) {
    p.maxEnergy = Math.min(MAX_ENERGY, p.maxEnergy + 1);
    p.energy = p.maxEnergy;
    p.manaWellUsed = true;
  }
  p.lanes.forEach((u) => {
    if (u) {
      u.canAttack = !u.tags?.includes("frozen");
      u.tags = (u.tags || []).filter((t) => t !== "frozen");
      u.tempAtk = 0;
      u.tempHp = 0;
    }
  });
}

function endTurn() {
  selectedAttacker = null;
  game.turnBuffs.playerAtk = 0;
  game.turnBuffs.enemyAtk = 0;
  if (checkWinner()) return;
  if (game.turn === "player") {
    game.turn = "enemy";
    startTurn("enemy");
    render();
    setTimeout(aiTakeTurn, 450);
  } else {
    game.turn = "player";
    startTurn("player");
    render();
  }
}

function playCard(handIndex, laneIndex = null, actor = "player") {
  const me = actor === "player" ? game.player : game.enemy;
  const opp = actor === "player" ? game.enemy : game.player;
  const card = me.hand[handIndex];
  if (!card || card.cost > me.energy) return false;

  if (card.type === "unit") {
    if (laneIndex == null || me.lanes[laneIndex]) return false;
    me.energy -= card.cost;
    me.hand.splice(handIndex, 1);
    const unit = {
      ...card,
      currentHp: card.hp,
      canAttack: card.tags?.includes("swift") || actor === "enemy",
      tempAtk: 0,
      tempHp: 0,
    };
    me.lanes[laneIndex] = unit;
    log(`${actor} played ${card.name} into lane ${laneIndex + 1}.`);
    return true;
  }

  if (card.type === "relic") {
    me.energy -= card.cost;
    me.hand.splice(handIndex, 1);
    me.relic = card;
    log(`${actor} equipped relic: ${card.name}.`);
    return true;
  }

  if (card.type === "spell") {
    me.energy -= card.cost;
    me.hand.splice(handIndex, 1);
    resolveSpell(card, me, opp, laneIndex, actor);
    log(`${actor} cast ${card.name}.`);
    removeDeadUnits();
    checkWinner();
    return true;
  }

  return false;
}

function resolveSpell(card, me, opp, laneIndex, actor) {
  const ownAtkBuff = actor === "player" ? "playerAtk" : "enemyAtk";
  switch (card.id) {
    case "firebolt":
      dealBestSpellDamage(me, opp, 3, laneIndex);
      break;
    case "spark":
      dealBestSpellDamage(me, opp, 2, laneIndex);
      break;
    case "mend":
      me.hp = Math.min(MAX_HP, me.hp + 4);
      break;
    case "draw-two":
      drawCard(me, 2);
      break;
    case "rally":
      game.turnBuffs[ownAtkBuff] += 1;
      break;
    case "reinforce": {
      const target = pickUnitForBuff(me, laneIndex);
      if (target) {
        target.tempAtk += 2;
        target.tempHp += 2;
      }
      break;
    }
  }
}

function pickUnitForBuff(me, laneIndex) {
  if (laneIndex != null && me.lanes[laneIndex]) return me.lanes[laneIndex];
  return me.lanes.find(Boolean);
}

function dealBestSpellDamage(me, opp, amount, laneIndex = null) {
  if (laneIndex != null && opp.lanes[laneIndex]) {
    opp.lanes[laneIndex].currentHp -= amount;
    return;
  }
  const guardIdx = opp.lanes.findIndex((u) => u?.tags?.includes("guard"));
  if (guardIdx >= 0) {
    opp.lanes[guardIdx].currentHp -= amount;
    return;
  }
  const weak = opp.lanes
    .map((u, i) => ({ u, i }))
    .filter((x) => x.u)
    .sort((a, b) => a.u.currentHp - b.u.currentHp)[0];
  if (weak) weak.u.currentHp -= amount;
  else opp.hp -= amount;
}

function totalAtk(player, laneIndex) {
  const u = player.lanes[laneIndex];
  if (!u) return 0;
  let atk = u.atk + (u.tempAtk || 0);
  if (player.relic?.id === "war-banner") atk += 1;
  if (player.relic?.id === "banner-might") atk += 1;
  if (player === game.player) atk += game.turnBuffs.playerAtk;
  if (player === game.enemy) atk += game.turnBuffs.enemyAtk;
  return Math.max(0, atk);
}

function unitMaxHp(player, laneIndex) {
  const u = player.lanes[laneIndex];
  if (!u) return 0;
  let hp = u.hp + (u.tempHp || 0);
  if (player.relic?.id === "banner-might") hp += 1;
  return hp;
}

function attackLane(actor, laneIndex, targetLaneIndex) {
  const me = actor === "player" ? game.player : game.enemy;
  const opp = actor === "player" ? game.enemy : game.player;
  const attacker = me.lanes[laneIndex];
  if (!attacker || !attacker.canAttack) return false;

  const enemyGuards = opp.lanes
    .map((u, idx) => ({ u, idx }))
    .filter((x) => x.u?.tags?.includes("guard"));
  if (enemyGuards.length > 0 && !enemyGuards.some((g) => g.idx === targetLaneIndex)) return false;

  const target = opp.lanes[targetLaneIndex];
  const atk = totalAtk(me, laneIndex);
  if (target) {
    const retaliation = totalAtk(opp, targetLaneIndex);
    target.currentHp -= atk;
    attacker.currentHp -= retaliation;
  } else {
    opp.hp -= atk;
  }
  attacker.canAttack = false;
  removeDeadUnits();
  checkWinner();
  return true;
}

function removeDeadUnits() {
  [game.player, game.enemy].forEach((p) => {
    p.lanes = p.lanes.map((u, idx) => {
      if (!u) return null;
      const maxHp = unitMaxHp(p, idx);
      if (u.currentHp > maxHp) u.currentHp = maxHp;
      return u.currentHp <= 0 ? null : u;
    });
  });
}

function aiTakeTurn() {
  if (game.turn !== "enemy" || game.winner) return;
  const ai = game.enemy;

  if (game.difficulty === "hard") {
    const lethal = ai.lanes.reduce((sum, u, i) => sum + (u?.canAttack ? totalAtk(ai, i) : 0), 0);
    if (lethal >= game.player.hp) {
      for (let i = 0; i < LANES; i++) if (ai.lanes[i]?.canAttack) attackLane("enemy", i, i);
      render();
      if (!game.winner) endTurn();
      return;
    }
  }

  let acted = true;
  while (acted) {
    acted = false;
    const playable = ai.hand
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => c.cost <= ai.energy)
      .sort((a, b) => a.c.cost - b.c.cost);

    for (const { c, i } of playable) {
      if (c.type === "unit") {
        const open = ai.lanes.map((u, idx) => (u ? -1 : idx)).filter((x) => x >= 0);
        if (!open.length) continue;
        let lane = open[Math.floor(Math.random() * open.length)];
        if (game.difficulty !== "easy") {
          lane = open.sort((a, b) => (game.player.lanes[b] ? 1 : 0) - (game.player.lanes[a] ? 1 : 0))[0];
        }
        if (playCard(i, lane, "enemy")) {
          acted = true;
          break;
        }
      }
      if (c.type === "spell") {
        let lane = null;
        if (game.difficulty !== "easy") {
          const dangerous = game.player.lanes
            .map((u, idx) => ({ u, idx }))
            .filter((x) => x.u)
            .sort((a, b) => totalAtk(game.player, b.idx) - totalAtk(game.player, a.idx))[0];
          if (dangerous) lane = dangerous.idx;
        }
        if (playCard(i, lane, "enemy")) {
          acted = true;
          break;
        }
      }
      if (c.type === "relic" && !ai.relic) {
        if (playCard(i, null, "enemy")) {
          acted = true;
          break;
        }
      }
    }
  }

  for (let i = 0; i < LANES; i++) {
    if (!ai.lanes[i]?.canAttack) continue;
    let target = i;
    if (game.difficulty === "easy") {
      const options = [0, 1, 2];
      target = options[Math.floor(Math.random() * options.length)];
    }
    attackLane("enemy", i, target);
  }

  render();
  if (!game.winner) endTurn();
}

function checkWinner() {
  if (game.player.hp <= 0 && game.enemy.hp <= 0) game.winner = "Draw";
  else if (game.player.hp <= 0) game.winner = "Enemy";
  else if (game.enemy.hp <= 0) game.winner = "Player";

  if (game.winner) {
    log(`${game.winner} wins!`);
    el.endTurnBtn.disabled = true;
    return true;
  }
  return false;
}

function log(text) {
  el.logLine.textContent = text;
}

function render() {
  if (!game) return;
  const { player, enemy } = game;

  el.playerHp.textContent = player.hp;
  el.enemyHp.textContent = enemy.hp;
  el.playerEnergy.textContent = `${player.energy} / ${player.maxEnergy}`;
  el.enemyEnergy.textContent = `${enemy.energy} / ${enemy.maxEnergy}`;
  el.playerDeckCount.textContent = player.deck.length;
  el.enemyDeckCount.textContent = enemy.deck.length;
  el.playerRelic.textContent = player.relic?.name || "—";
  el.enemyRelic.textContent = enemy.relic?.name || "—";
  el.turnLabel.textContent = game.winner ? `${game.winner} wins` : game.turn === "player" ? "Your Turn" : "Enemy Turn";

  el.endTurnBtn.disabled = game.turn !== "player" || !!game.winner;
  el.enemyZone.style.opacity = game.turn === "player" ? "0.92" : "1";
  el.playerZone.style.opacity = game.turn === "enemy" ? "0.8" : "1";

  renderLanes("player");
  renderLanes("enemy");
  renderHand();
}

function renderLanes(side) {
  const p = side === "player" ? game.player : game.enemy;
  const isPlayer = side === "player";
  const root = isPlayer ? el.playerLanes : el.enemyLanes;
  root.innerHTML = "";

  for (let i = 0; i < LANES; i++) {
    const lane = document.createElement("div");
    lane.className = "lane";
    const u = p.lanes[i];

    if (u) {
      const canAttack = isPlayer && game.turn === "player" && u.canAttack;
      const classes = ["card"];
      if (u.tags?.includes("frozen")) classes.push("frozen");
      if (u.tags?.includes("guard")) classes.push("guard");
      if (canAttack) classes.push("can-attack");
      if (selectedAttacker?.lane === i && isPlayer) classes.push("selected");
      lane.innerHTML = `
        <div class="${classes.join(" ")}">
          <div class="name">${u.name}</div>
          <div class="tags">${(u.tags || []).join(", ") || "—"}</div>
          <div class="stats"><span>⚔ ${totalAtk(p, i)}</span><span>❤ ${u.currentHp}</span></div>
        </div>
      `;
      if (isPlayer && game.turn === "player") {
        lane.addEventListener("click", () => {
          if (selectedAttacker && selectedAttacker.lane !== i) {
            attackLane("player", selectedAttacker.lane, i);
            selectedAttacker = null;
          } else if (u.canAttack) {
            selectedAttacker = { lane: i };
          }
          render();
        });
      }
    } else {
      lane.innerHTML = `<div class="muted">Lane ${i + 1}</div>`;
      if (!isPlayer && game.turn === "player" && selectedAttacker) {
        lane.classList.add("selectable");
        lane.addEventListener("click", () => {
          attackLane("player", selectedAttacker.lane, i);
          selectedAttacker = null;
          render();
        });
      }
    }

    root.appendChild(lane);
  }
}

function renderHand() {
  const p = game.player;
  el.playerHand.innerHTML = "";
  p.hand.forEach((card, index) => {
    const c = document.createElement("div");
    c.className = "card";
    c.innerHTML = `
      <div class="cost">⚡ ${card.cost}</div>
      <div class="name">${card.name}</div>
      <div class="muted">${card.type.toUpperCase()}</div>
      <div class="muted">${card.type === "unit" ? `${card.atk}/${card.hp}` : card.text || ""}</div>
    `;

    if (game.turn === "player" && !game.winner) {
      c.addEventListener("click", () => {
        if (card.cost > p.energy) return;
        if (card.type === "unit") {
          const empty = p.lanes.map((u, i) => (u ? -1 : i)).filter((i) => i >= 0);
          if (!empty.length) return;
          playCard(index, empty[0], "player");
        } else {
          playCard(index, null, "player");
        }
        render();
      });
    }

    el.playerHand.appendChild(c);
  });
}

el.startBtn.addEventListener("click", startGame);
el.endTurnBtn.addEventListener("click", () => {
  if (game.turn !== "player" || game.winner) return;
  endTurn();
});
el.resetDeckBtn.addEventListener("click", setupDeckBuilder);

setupDeckBuilder();
