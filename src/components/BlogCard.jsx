import { Link } from 'react-router-dom';
import { formatDate } from '../blog.js';

export default function BlogCard({ post, featured = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className={`card post-card ${featured ? 'post-card--featured' : ''}`}>
      <div className="post-card__img">
        {post.image ? (
          <img src={post.image} alt="" loading={featured ? 'eager' : 'lazy'} />
        ) : (
          <span className="post-card__placeholder" aria-hidden="true">Rebirth</span>
        )}
        <span className="post-card__cat">{post.category}</span>
      </div>
      <div className="post-card__body">
        <p className="post-card__meta">
          {formatDate(post.date)} <span aria-hidden="true">·</span> {post.readMinutes} min read
        </p>
        <h3>{post.title}</h3>
        {featured && <p className="muted post-card__excerpt">{post.excerpt}</p>}
        <span className="link">Read article →</span>
      </div>
    </Link>
  );
}
