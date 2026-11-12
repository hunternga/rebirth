import { Link } from 'react-router-dom';
import { focusAreas, milestones, team, values, whyUs } from '../data.js';
import PageHeader from '../components/PageHeader.jsx';
import SectionHead from '../components/SectionHead.jsx';
import CtaBand from '../components/CtaBand.jsx';

const founder = team[0];

export default function About() {
  return (
    <>
      <PageHeader
        crumb="About"
        eyebrow="Our story · Born in Mumbai"
        title="A global wellness platform"
        lead="Started in 2019 by a panel of medical doctors and experts, Rebirth Fitness School has grown from a Mumbai wellness center into an online platform helping patients around the world."
      />

      {/* Story */}
      <section className="section">
        <div className="container about">
          <div className="about__visual">
            <img src="/images/founder.webp" alt="Dr. Isacc Abbas, founder of Rebirth Fitness School" />
            <div className="about__badge">
              <strong>14+</strong>
              <span>years in fitness<br />&amp; wellness</span>
            </div>
          </div>
          <div>
            <p className="eyebrow">Who we are</p>
            <h2 className="section__title">More than fitness. A medical approach to wellness.</h2>
            <p className="muted">
              Rebirth Fitness School is a wellness center started in 2019 in Mumbai by a panel of
              medical doctors and experts. Today, it has evolved into a global online wellness
              platform, helping over 5,000 patients worldwide improve fitness, strength, functional
              performance, hair and skin health, and overall well-being.
            </p>
            <p className="muted">
              Our programs are scientifically designed and personalized, focusing on diet, exercise,
              customized workout and nutrition protocols, and lifestyle interventions. Patients can
              focus on muscle building, weight loss, obesity reduction, skin rejuvenation, and hair
              health.
            </p>
            <p className="muted">
              The name says it all: we believe anyone can rebuild their health from the inside out.
              A rebirth is not a crash diet or a 30-day challenge — it is a lasting change in how you
              train, eat, rest and live, guided by doctors who understand both medicine and fitness.
            </p>
            <ul className="chips">
              {focusAreas.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="section section--alt">
        <div className="container grid grid--2">
          <div className="card statement">
            <p className="eyebrow">Our mission</p>
            <h3>Evidence-based wellness, personalized for every individual</h3>
            <p className="muted">
              To help people rebuild their health through scientifically designed, personalized
              programs — reviewed by a full panel of medical experts so that every protocol is safe,
              effective and uniquely theirs.
            </p>
          </div>
          <div className="card statement">
            <p className="eyebrow">Our vision</p>
            <h3>World-class wellness, accessible to everyone</h3>
            <p className="muted">
              A world where quality medical wellness guidance is available regardless of location or
              economic status — which is why we offer subsidised fees for economically weaker
              sections and free consultations for specially abled people.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What we stand for" title="Our values" />
          <div className="grid grid--4">
            {values.map((v, i) => (
              <article key={v.title} className="card step">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{v.title}</h3>
                <p className="muted">{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section section--alt">
        <div className="container founder">
          <div className="founder__photo">
            <img src={founder.photo} alt={founder.name} loading="lazy" />
          </div>
          <div>
            <p className="eyebrow">Meet the founder</p>
            <h2 className="section__title">{founder.name}</h2>
            <p className="doctor__creds">{founder.creds} · Medical Doctor · Fitness Trainer · Medical Cosmetology</p>
            <p className="muted">
              Dr. Isacc Abbas is a medical doctor, fitness trainer, wellness expert, and medical
              cosmetology professional with over 14 years of experience in the fitness and wellness
              field. He provides structured exercise guidance, evidence-based nutrition, sustainable
              lifestyle practices, and holistic wellness approaches.
            </p>
            <p className="muted">
              He focuses on helping individuals achieve healthier skin, a fitter body, and improved
              overall well-being. He also initiated Rebirth's accessibility programme — subsidised
              consultations for economically weaker sections and free consultations for all specially
              abled people.
            </p>
            <div className="card pedia">
              <h3>Dr. Isacc Abbas Pedia</h3>
              <p className="muted">
                A medical knowledge platform providing evidence-based health information on diseases,
                medications, skincare, hair care, nutrition, fitness, and preventive healthcare.
                Backed by Dr. Isacc Abbas and his medical team, with a social media presence of over
                2 million followers on Instagram and YouTube. All content is supported by references
                from peer-reviewed journals, meta-analyses, review articles, and standard medical
                textbooks.
              </p>
              <Link to="/blog" className="link">
                Read articles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Our journey" title="From Mumbai to the world" />
          <ol className="milestones">
            {milestones.map(([mark, title, text]) => (
              <li key={title}>
                <span className="milestones__mark">{mark}</span>
                <div>
                  <h3>{title}</h3>
                  <p className="muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why us */}
      <section className="section section--alt">
        <div className="container">
          <SectionHead eyebrow="Why Rebirth" title="What makes us different" />
          <div className="grid grid--2">
            {whyUs.map(([title, text]) => (
              <article key={title} className="card check-card">
                <span className="check" aria-hidden="true">✓</span>
                <div>
                  <h3>{title}</h3>
                  <p className="muted">{text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="center">
            <Link to="/team" className="btn btn--ghost">Meet the full panel</Link>
          </p>
        </div>
      </section>

      <CtaBand title="Start your rebirth" />
    </>
  );
}
