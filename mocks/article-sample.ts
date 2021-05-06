export const articles = [
  {
    id: '0',
    title: `Lorem Ipsum Title 1`,
    subtitle: `Lorem Ipsum Subtitle something about the title`,
    body: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, culpa cumque veniam exercitationem tempore at corporis animi quae hic, doloribus dolorem amet eligendi sit est autem quia voluptatibus recusandae ratione.`,
  },
  {
    id: '1',
    title: `Lorem Ipsum Title 2`,
    subtitle: `Lorem Ipsum Subtitle something about the title`,
    body: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, culpa cumque veniam exercitationem tempore at corporis animi quae hic, doloribus dolorem amet eligendi sit est autem quia voluptatibus recusandae ratione.`,
  },
  {
    id: '2',
    title: `Lorem Ipsum Title 3`,
    subtitle: `Lorem Ipsum Subtitle something about the title`,
    body: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas, culpa cumque veniam exercitationem tempore at corporis animi quae hic, doloribus dolorem amet eligendi sit est autem quia voluptatibus recusandae ratione.`,
  },
];

export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type Article = ArrayElement<typeof articles>;

export default articles;
