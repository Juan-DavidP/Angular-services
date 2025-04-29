import { Character } from "../models"

export const characterAdapter = (characters: Character[]) =>characters.map((c)=>({...c, name: c.name.toUpperCase()}));
