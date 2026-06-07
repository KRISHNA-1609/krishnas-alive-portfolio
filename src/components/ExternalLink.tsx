import { forwardRef, type AnchorHTMLAttributes } from "react";

export type ExternalLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
};

/**
 * Anchor wrapper that guarantees every external URL opens in a new tab
 * with safe `rel` attributes. Use this for any link pointing outside the app.
 */
const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ href, rel, target = "_blank", children, ...rest }, ref) => {
    const safeRel = Array.from(
      new Set(["noopener", "noreferrer", ...(rel?.split(/\s+/).filter(Boolean) ?? [])])
    ).join(" ");
    return (
      <a ref={ref} href={href} target={target} rel={safeRel} {...rest}>
        {children}
      </a>
    );
  }
);

ExternalLink.displayName = "ExternalLink";

export default ExternalLink;
