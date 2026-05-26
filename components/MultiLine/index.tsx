import { Fragment } from "react";

export function MultiLine({ body }: { body: string }) {
  const texts = body.split("\n").map((item, index) => {
    return (
      <Fragment key={index}>
        <span>{item}</span>
        <br />
      </Fragment>
    );
  });
  return <>{texts}</>;
}
