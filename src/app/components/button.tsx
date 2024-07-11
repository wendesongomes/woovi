interface ButtonProps {
  children: React.ReactNode;
}

export function Button(props: ButtonProps) {
  return (
    <button className="bg-deep-blue px-5 py-2 rounded flex gap-2.5 justify-center leading-6 text-lg font-semibold text-white">
      {props.children}
    </button>
  );
}
