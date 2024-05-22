export function Sentence({ sentenceChars }: { sentenceChars: string[] }) {
  const sentence = sentenceChars.join("");

  return (
    <p className="w-fit cursor-default rounded-lg border-2 border-yellow-300 p-3 text-center text-sm tracking-wider text-yellow-300">
      {sentence}
    </p>
  );
}
