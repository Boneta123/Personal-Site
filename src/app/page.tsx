import BlurText from "@/components/BlurText";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <BlurText
        text="Michael Boneta"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-5xl font-semibold tracking-tight"
      />
    </div>
  );
}
