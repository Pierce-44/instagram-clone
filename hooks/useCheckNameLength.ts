import React from 'react';

function useCheckNameLength({
  widthRef,
}: {
  widthRef: React.RefObject<HTMLDivElement>;
}) {
  const [nameWidth, setNameWidth] = React.useState<null | number>(null);

  React.useEffect(() => {
    if (widthRef.current) {
      setNameWidth(widthRef.current?.offsetWidth);
    }
  }, [widthRef]);

  return { nameWidth };
}

export default useCheckNameLength;
