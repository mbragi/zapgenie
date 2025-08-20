const BackgroundOrbs = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-electric/20 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-magic/20 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-lightning/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
    </div>
  );
};

export default BackgroundOrbs;
