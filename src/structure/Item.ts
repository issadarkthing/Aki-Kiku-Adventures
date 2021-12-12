import { Message, MessageEmbed } from "discord.js";
import { Armor } from "./Armor";
import { Weapon } from "./Weapon";
import { Pet } from "./Pet";
import { Skill } from "./Skill";
import { Perks } from "./Perks";

export abstract class Item {
  abstract name: string;
  abstract id: string;
  abstract price: number;
  abstract show(): MessageEmbed;
  abstract buy(msg: Message): void;
  static get all() {
    return [
      ...Armor.all,
      ...Weapon.all,
      ...Pet.all,
      ...Skill.all,
      ...Perks.all,
    ];
  }
}
