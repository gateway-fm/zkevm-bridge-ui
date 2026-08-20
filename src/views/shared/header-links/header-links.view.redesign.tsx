import { useEffect, useRef, useState } from "react";
import { useHeaderLinksRedesignStyles } from "./header-links.styles";
import ArrowRight  from "src/assets/icons/arrow-right-white.svg?react";
import BurgerMenuIcon  from "src/assets/icons/burger-menu.svg?react";
import { brand } from "src/brands";

type LinkItem = { title: string; url: string };

const Logo = brand.assets.Logo;

export const HeaderLinks = () => {
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerIconRef = useRef<HTMLDivElement>(null);
  const classes = useHeaderLinksRedesignStyles();
  const isMobile = window.innerWidth < 788;
  const { deployButton } = brand.header;

  const linksList: LinkItem[] = [
    ...brand.header.links,
    ...(isMobile && deployButton ? [deployButton] : []),
  ];

  const onOpenBurgerMenu = () => {
    setOpenBurgerMenu((prev) => !prev);
  };

  const redirectToDeploy = () => {
    if (deployButton) {
      window.open(deployButton.url, "_blank");
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      // If the click is inside the menu container:
      if (menuRef.current && menuRef.current.contains(target)) {
        // If the clicked element is not inside an anchor element, close the menu
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        if (!(target as HTMLElement).closest("a")) {
          setOpenBurgerMenu(false);
        }
      } else if (
        // Otherwise, if the click is outside the burger icon as well, close the menu.
        burgerIconRef.current &&
        !burgerIconRef.current.contains(target)
      ) {
        setOpenBurgerMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={classes.wrapper}>
      <div className={classes.linksAndLogoContainer}>
        <Logo
          className={classes.logo}
          onClick={() => window.open(brand.header.homeUrl, "_blank")}
        />
        <div ref={burgerIconRef}>
          <BurgerMenuIcon
            className={`${classes.burgerMenu} ${openBurgerMenu ? classes.openedBurgerMenuIcon : ""
              }`}
            onClick={onOpenBurgerMenu}
          />
        </div>
        <div
          className={classes.linksContainer}
          ref={menuRef}
          style={{ display: openBurgerMenu || !isMobile ? "flex" : "none" }}
        >
          {linksList.filter(Boolean).map(({ title, url }, index) => (
            <a
              className={classes.linkItem}
              href={url}
              key={index}
              rel="noopener noreferrer"
              target="_blank"
            >
              {title}
            </a>
          ))}
        </div>
      </div>
      {deployButton && (
        <button className={classes.button} onClick={redirectToDeploy}>
          {deployButton.title} <ArrowRight className={classes.icon} />
        </button>
      )}
    </div>
  );
};
