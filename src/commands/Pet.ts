import { Command } from "@jiman24/commandment";
import { Message } from "discord.js";
import { Player } from "../structure/Player";
import { random } from "../utils";

export default class Pet extends Command {
  name = "pet";
  description = "interact with your pet";

  async exec(msg: Message) {

    const player = Player.fromUser(msg.author);
    const pet = player.pet;

    if (!pet) {
      throw new Error("you have no active pet");
    }

    const interactions = [
      `${player.name} pets ${pet.name}`,
      `${pet.name} cuddles up to ${player.name} and seems happy`,
      `${player.name} taps head of ${pet.name} and ${pet.name} hops around`,
      `${player.name} tries to pet ${pet.name} but they run away`,
    ];

    const interaction = random.pick(interactions);
    msg.channel.send(interaction);
  }
}
