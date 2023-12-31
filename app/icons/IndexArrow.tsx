import type { ForwardedRef } from "react";
import { forwardRef } from "react";

type Props = {
  className?: string;
};

type Ref = ForwardedRef<SVGSVGElement>;

const IndexArrow = forwardRef<SVGSVGElement, Props>(function Arrow(
  props: Props,
  ref: Ref
) {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="9 22 82 55"
      className={props.className}
    >
      <path d="M90,49.7c0-0.1,0-0.2,0-0.3c0-0.1,0-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.3c0-0.1-0.1-0.2-0.1-0.2  c-0.1-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0-0.1c0,0-0.1-0.1-0.1-0.1c-0.1-0.1-0.1-0.1-0.1-0.1L61,23.5c-0.9-0.7-2-0.9-3.1-0.5  c-1,0.5-1.7,1.5-1.7,2.6v12.6H12.9c-1.6,0-2.9,1.3-2.9,2.9v17.9c0,1.6,1.3,2.9,2.9,2.9h43.5v12.6c0,1.1,0.7,2.1,1.7,2.6  c0.4,0.2,0.8,0.3,1.2,0.3c0.7,0,1.3-0.2,1.9-0.7l28-24.4c0.1,0,0.1-0.1,0.2-0.2c0,0,0.1-0.1,0.1-0.1c0,0,0-0.1,0-0.1  c0.1-0.1,0.1-0.2,0.2-0.3c0-0.1,0.1-0.1,0.1-0.2c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0.1-0.2,0.1-0.3c0-0.1,0-0.2,0.1-0.3  c0-0.1,0-0.2,0-0.3c0-0.1,0-0.2,0-0.3C90,49.9,90,49.8,90,49.7z" />
    </svg>
  );
});

export default IndexArrow;
