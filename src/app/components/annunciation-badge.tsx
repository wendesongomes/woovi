interface AnnunciationBadgeProps {
  highlight: string;
  text: string;
}

export function AnnunciationBadge(props: AnnunciationBadgeProps) {
  return (
    <div className="bg-deep-blue rounded flex justify-between items-center mt-2">
      <p className="font-semibold leading-5 text-white p-2">
        <span className="font-extrabold">{props.highlight}</span> {props.text}
      </p>
      <span className="[clip-path:polygon(0%_50%,100%_0%,100%_100%)] bg-white size-7 relative left-1" />
    </div>
  );
}
