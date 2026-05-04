export function Footer() {
  return (
    <footer
      id="footer"
      className="footer flex h-screen w-screen shrink-0 snap-start flex-col justify-between bg-surface px-[8%] pb-10 pt-24"
    >
      <div className="mx-auto flex w-full max-w-6xl justify-between gap-12 border-b border-border-soft pb-14 max-lg:flex-col">
        <div className="footer-brand">
          <h3 className="text-3xl font-bold tracking-normal text-ink">Velyn</h3>
          <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
            Premium portrait templates for modern creatives. Elegance in every pixel.
          </p>
        </div>

        <div className="flex gap-16 max-sm:flex-col max-sm:gap-8">
          <div className="footer-col">
            <h4 className="text-sm font-bold text-ink">Product</h4>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li>
                <a className="transition hover:text-ink" href="#">
                  Templates
                </a>
              </li>
              <li>
                <a className="transition hover:text-ink" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="transition hover:text-ink" href="#">
                  Showcase
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="text-sm font-bold text-ink">Company</h4>
            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li>
                <a className="transition hover:text-ink" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="transition hover:text-ink" href="#">
                  Contact
                </a>
              </li>
              <li>
                <a className="transition hover:text-ink" href="#">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} Velyn. All rights reserved.
      </div>
    </footer>
  );
}
