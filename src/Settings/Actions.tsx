import * as formText from "txtgen";
import { moreAdjectives, moreTemplates, possibleNouns } from "./Helpers";

//adds more nouns,templates and adjectives
formText.addAdjectives(moreAdjectives);
formText.addNouns(possibleNouns);
formText.setTemplates(moreTemplates);

//forms a random sentence depending on the difficulty
export function formSentence(diff: string): string {
  if (diff.toLowerCase() === "easy") {
    return formText.sentence();
  }
  if (diff.toLowerCase() === "medium") {
    return formText.paragraph(1.5);
  }

  return formText.lorem(37, 37);
}

//splits a sentence into an array
export function splitIntoChars(text: string): string[] {
  return text.split("");
}
