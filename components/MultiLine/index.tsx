export function MultiLine({ body }: { body: string }) {
  return (
    <>
      {body.split("\n").map((item, index) => {
        return <span key={index}>{item}</span>;
      })}
    </>
  );
}
