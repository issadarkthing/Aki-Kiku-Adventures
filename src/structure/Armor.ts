import { Message } from "discord.js";
import { Armor as BaseArmor } from "discordjs-rpg";
import { Player } from "../structure/Player";

export abstract class Armor extends BaseArmor {
  abstract price: number;

  static get all(): Armor[] {
    return [
      new GoldHaori(),
      new VampireSlayerOutfit(),
      new ShogunArmor(),
      new AstronautSuit(),
    ];
  }

  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (
      player.inventory.some(x => x.id === this.id) ||
      player.equippedArmors.some(x => x.id === this.id)
    ) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }
}


export class GoldHaori extends Armor {
  id = "helmet";
  name = "Gold Haori";
  price = 8500;
  armor = 0.005
}

export class VampireSlayerOutfit extends Armor {
  id = "chest_plate";
  name = "Vampire Slayer Outfit";
  price = 5000;
  armor = 0.006
}

export class ShogunArmor extends Armor {
  id = "leggings";
  name = "Shogun Armor";
  price = 4500;
  armor = 0.008
}

export class AstronautSuit extends Armor {
  id = "boots";
  name = "Astronaut Suit";
  price = 5500;
  armor = 0.011
}
