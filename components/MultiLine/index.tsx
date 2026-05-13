import { Fragment } from "react/jsx-runtime";

export function MultiLine({ body }: { body: string }) {
  const texts = body.split("\n").map((item, index) => {
    return (
      <Fragment key={index}>
        {item}
        <br />
      </Fragment>
    );
  });
  return <>{texts}</>;
}
