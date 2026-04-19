import Logo from "@/assets/brand.png";
import { mainNav } from "@/data/main-nav";
import Image from "next/image";
import Link from "next/link";
import Button from "../common/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-[18px] bg-[rgba(245,241,234,0.84)] border-b border-[rgba(182,171,156,0.45)]">
      <div className="w-[min(calc(100%-1.5rem),76rem)] md:w-[min(calc(100%-3rem),76rem)] mx-auto flex items-center justify-between gap-4 py-4">
        <Link
          href="/"
          className="grid gap-[0.2rem]"
          aria-label="Lexi's Kitchen home"
        >
          <div className="flex items-center gap-3">
            <Image
              src={Logo}
              alt="Lexi's Kitchen logo"
              width={50}
              height={50}
              className="w-12.5 h-12.5 object-contain"
            />
          </div>
        </Link>
        <nav
          className="hidden md:flex items-center gap-[1.2rem]"
          aria-label="Primary navigation"
        >
          {mainNav.map((nav) =>
            nav.isExternal ? (
              <a
                key={nav.title}
                href={nav.href}
                target="_blank"
                rel="noreferrer"
                className="text-text-soft transition-colors duration-300 ease-[ease] hover:text-text focus-visible:text-text"
              >
                {nav.title}
              </a>
            ) : (
              <Link
                key={nav.title}
                href={nav.href}
                className="text-text-soft transition-colors duration-300 ease-[ease] hover:text-text focus-visible:text-text"
              >
                {nav.title}
              </Link>
            ),
          )}
        </nav>
        <Link className="md:hidden" href={mainNav[0].href}>
          <Button variant="primary" className="h-10!">
            {mainNav[0].title}
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
