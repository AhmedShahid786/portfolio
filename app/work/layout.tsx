import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

// Same frame as the home page: nav and footer outside the shell, everything
// else inside the `max-w-3xl border-x` column.
export default function WorkLayout({ children }: LayoutProps<"/work">) {
  return (
    <>
      <SiteNav />

      <div className="flex max-w-screen flex-1 flex-col overflow-x-clip">
        <div className="border-border mx-auto w-full max-w-3xl flex-1 border-x [--separator-height:--spacing(8)]">
          {children}
        </div>
      </div>

      <SiteFooter />
    </>
  );
}
