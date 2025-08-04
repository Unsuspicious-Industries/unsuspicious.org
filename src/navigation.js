import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';


export const headerData = {
  links: [
    {
      text: 'Applied Research',
      href: getPermalink('/product'),
    },
    {
      text: 'DFS Laboratory',
      href: getPermalink('/dfs'),
    },
    {
      text: "About Us",
      href: getPermalink('/about'),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
    {
      text: 'Research',
      href: getBlogPermalink(),
    }
  ],
  
};

export const footerData = {
  secondaryLinks: [
    { text: 'Research Ethics', href: getPermalink('/ethics') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: 'Contact', href: getPermalink('/contact')}
  ],
  socialLinks: [
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://linkedin.com/company/unsuspicious' },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/Unsuspicious-Industries' },
    { ariaLabel: 'X', icon: 'tabler:brand-twitter', href: 'https://x.com/unsuspiciousind' },
    { ariaLabel: 'Hugging Face', icon: 'tabler:mood-smile-beam', href: 'https://huggingface.co/dfslab' },
  ],
  footNote: `
    <span class="w-5 h-5 md:w-6 md:h-6 md:-mt-0.5 bg-cover mr-1.5 rtl:mr-0 rtl:ml-1.5 float-left rtl:float-right rounded-sm bg-[url(~/assets/logo/logo.png)]"></span>
    <a class="text-blue-600 underline" href="/"> Unsuspicious Industries</a> · Established 2023 · All rights reserved.
  `,
};
