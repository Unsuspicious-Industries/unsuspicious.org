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
      text: 'contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'research',
      href: 'https://unsuspicious.science',
    }
  ],
  
};

export const footerData = {
  secondaryLinks: [
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: "Contact", href: getPermalink('/contact')}
  ],
  socialLinks: [
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/unsuspiciousind' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://instagram.com/paul_k.d' }, /*TODO: Mkae proper instagram*/ 
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/unsuspicious-industries' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(~/assets/logo/logo.png)]"></span>
    <a class="text-blue-600 underline dark:text-muted" href="/"> Unsuspicious</a> · All rights reserved.
  `,
};
