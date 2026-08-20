import { FC } from "react";
import { createUseStyles } from "react-jss";

import { brand } from "src/brands";
import { Theme } from "src/styles/theme";

const useBrandHeadingStyles = createUseStyles((theme: Theme) => ({
  accent: {
    color: theme.palette.primary.main,
  },
}));

// Network-name heading. Brands with `accentHeadingFirstWord` render the first
// word in the primary colour (e.g. "TEIZA Devnet").
export const BrandHeading: FC<{ name: string }> = ({ name }) => {
  const classes = useBrandHeadingStyles();
  const [firstWord, ...rest] = name.split(" ");

  if (!brand.accentHeadingFirstWord || rest.length === 0) {
    return <>{name}</>;
  }

  return (
    <>
      <span className={classes.accent}>{firstWord}</span> {rest.join(" ")}
    </>
  );
};
