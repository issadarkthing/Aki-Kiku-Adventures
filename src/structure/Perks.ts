import { Message, MessageEmbed } from "discord.js";
import { Player } from "./Player";
import { Item } from "./Item";


export abstract class Perks implements Item {
  abstract name: string;
  abstract id: string;
  abstract price: number;

  static get all(): Perks[] {
    return [
      new RaffleTicket(),
      new WhiteList(),
      new FreeNFT(),
    ];
  }

  show() {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .addField("Name", this.name)

    return embed;
  }
  
  async buy(msg: Message) {

    const player = Player.fromUser(msg.author);

    if (player.coins < this.price) {
      msg.channel.send("Insufficient amount");
      return;
    }

    if (player.inventory.some(x => x.id === this.id)) {
      msg.channel.send("You already own this item");
      return;
    }

    player.coins -= this.price;
    player.inventory.push(this);

    player.save();
    msg.channel.send(`Successfully bought **${this.name}**`);
  }
}

export class RaffleTicket extends Perks {
  id = "raffle-ticket";
  name = "Raffle Ticket";
  price = 2500;
}

export class WhiteList extends Perks {
  id = "whitelist";
  name = "Whitelist Scroll";
  price = 5000;
}

export class FreeNFT extends Perks {
  id = "free-nft";
  name = "Free NFT";
  price = 30000;
}
