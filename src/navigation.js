import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';


export const headerData = {
  links: [
    {
      text: 'product',
      href: getPermalink('/product'),
    },
    {
      text: 'services',
      href: getPermalink('/services'),
    },
    {
      text: "about",
      href: getPermalink('/about'),
    },
    {
      text: 'support',
      href: getPermalink('/support'),
    },
    {
      text: 'blog',
      href: getBlogPermalink(),
    },
    {
      text: 'privacy',
      href: getPermalink('/privacy'),
    }
  ],
};

export const footerData = {
  links: [
    
    { text: 'Blog', href: getBlogPermalink() },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Services', href: getPermalink('/services') },
    { text: 'Product', href: getPermalink('/product') },
    { text: 'Sales', href: getPermalink('/sales') },
  ],
  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/paul_k.d' }, /*TODO: Mkae proper instagram*/ 
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/unsuspicious-industries' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(logo.png)]"></span>
    <a class="text-blue-600 underline dark:text-muted" href="https://unsuspicious.org/pirvacy"> Unsuspicious</a> · All rights reserved.
  `,
};
