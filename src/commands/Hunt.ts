import { Command } from "@jiman24/commandment";
import { Message, MessageEmbed } from "discord.js";
import { Player } from "../structure/Player";
import { Battle } from "discordjs-rpg";
import { Monster } from "../structure/Monster";
import { bold, REPEAT, sleep, CROSSED_SWORD } from "../utils";
import { ButtonHandler } from "../structure/ButtonHandler";

class SearchMonster extends ButtonHandler {
  player: Player;
  _msg: Message;

  constructor(msg: Message, embed: MessageEmbed | string, player: Player) {
    super(msg, embed);
    this._msg = msg;
    this.player = player;
  }

  async search(cb: (monster: Monster) => Promise<void>) {

    const monster = new Monster(this.player);
    const button = new ButtonHandler(this._msg, monster.show())

    button.addButton(REPEAT, "search again", () => this.search(cb))
    button.addButton(CROSSED_SWORD, "battle", () => cb(monster))
    button.addCloseButton();

    await button.run();
  }
}

export default class extends Command {
  name = "hunt";
  description = "hunt monsters";
  block = true;

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);
    const search = new SearchMonster(msg, "", player);

    await search.search(async monster => {

      const battle = new Battle(msg, [player, monster]);
      const winner = await battle.run();

      if (winner.id === player.id) {

        const currLevel = player.level;
        player.addXP(monster.xpDrop);
        player.shards += monster.drop;
        player.save();

        msg.channel.send(`${player.name} has earned ${bold(monster.drop)} coins!`);
        msg.channel.send(`${player.name} has earned ${bold(monster.xpDrop)} xp!`);

        if (currLevel !== player.level) {
          msg.channel.send(`${player.name} is now on level ${bold(player.level)}!`);
        }
      } 

    })

  }
}