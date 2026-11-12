import posts from './blogIndex.json';

export { posts };

export const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category))).sort()];

export const author = {
  name: 'Dr. Isacc Abbas',
  role: 'Founder, Rebirth Fitness School',
  photo: '/images/isacc.webp',
};

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatDate = (iso) => (iso ? fmt.format(new Date(`${iso}T00:00:00`)) : '');

export const relatedPosts = (post, count = 3) => {
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, count);
};
