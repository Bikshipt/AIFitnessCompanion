import { z } from "zod";

export const characterClasses = [
  "Berserker",
  "Shadow Assassin",
  "Iron Titan",
  "Windrunner",
  "Mystic Monk",
  "Forge Master",
  "Phantom Blade",
  "Nature Walker",
  "Gymnast Sage",
  "Warrior Priest",
  // Hybrids (can unlock later in UX)
  "AIFitnessCompanion Knight",
  "Elemental Shaper",
  "Chrono Warrior",
  "Beast Tamer",
  "Neural Architect",
] as const;

export type CharacterClass = typeof characterClasses[number];

export const statsSchema = z.object({
  STR: z.number().int().nonnegative(),
  DUR: z.number().int().nonnegative(),
  AGI: z.number().int().nonnegative(),
  DEX: z.number().int().nonnegative(),
  STA: z.number().int().nonnegative(),
  INT: z.number().int().nonnegative(),
  WIL: z.number().int().nonnegative(),
  VIT: z.number().int().nonnegative(),
});

export type Stats = z.infer<typeof statsSchema>;

export const insertCharacterSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().min(1),
  className: z.enum(characterClasses),
});

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;

export interface Character {
  id: number;
  userId: number;
  name: string;
  className: CharacterClass;
  level: number;
  xp: number;
  stats: Stats;
  createdAt: Date;
}

export const insertQuestSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  tier: z.enum([
    "F","E","D","C","B","A","S","SS","SSS",
  ]),
});

export type InsertQuest = z.infer<typeof insertQuestSchema>;

export interface Quest {
  id: number;
  title: string;
  description: string;
  tier: "F"|"E"|"D"|"C"|"B"|"A"|"S"|"SS"|"SSS";
  createdAt: Date;
}

export interface XPGain {
  characterId: number;
  amount: number;
  reason: string;
}

export const defaultStats: Stats = {
  STR: 0,
  DUR: 0,
  AGI: 0,
  DEX: 0,
  STA: 0,
  INT: 0,
  WIL: 0,
  VIT: 0,
};


