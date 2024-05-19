import { lorem } from "txtgen";

export function formSentence(diff: string): string {
  if (diff.toLowerCase() === "easy") {
    return lorem(20, 20);
  }
  if (diff.toLowerCase() === "medium") {
    return lorem(25, 25);
  }

  return lorem(35, 35);
}

export function splitIntoChars(text: string): string[] {
  console.log(text.split("").length);
  return text.split("");
}
