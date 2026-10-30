-- Blog dashboard schema: posts + comments.
-- Run this in the Supabase SQL editor (Project > SQL Editor > New query).
-- Safe to re-run: uses IF NOT EXISTS / ON CONFLICT throughout.

create extension if not exists "pgcrypto";

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('professional', 'personal')),
  tag text not null,
  title text not null,
  excerpt text not null,
  content text not null,
  read_time text not null default '5 min read',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

-- Upgrades an older, empty blog_posts table to the columns the app expects.
alter table blog_posts add column if not exists tag text not null;
alter table blog_posts add column if not exists read_time text not null default '5 min read';
alter table blog_posts alter column excerpt set not null;
alter table blog_posts drop constraint if exists blog_posts_category_check;
alter table blog_posts add constraint blog_posts_category_check check (category in ('professional', 'personal'));

create index if not exists blog_posts_published_idx on blog_posts (published, published_at desc);

create table if not exists blog_comments (
  id uuid primary key default gen_random_uuid(),
  post_slug text not null references blog_posts (slug) on delete cascade,
  author_name text not null,
  author_email text not null,
  body text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists blog_comments_post_slug_idx on blog_comments (post_slug, status, created_at);

-- All access to these tables goes through server-side API routes using the
-- Supabase service role key (which bypasses RLS), matching the existing
-- appointments/feedback/intake tables in this project. Row Level Security is
-- enabled with no policies so the anon/public key (if ever exposed to the
-- browser) cannot read or write these tables directly.
alter table blog_posts enable row level security;
alter table blog_comments enable row level security;

-- Seed data: migrates the posts that previously lived in src/lib/blog-data.ts.
-- Uses slug as the natural key so this is safe to re-run.
insert into blog_posts (slug, category, tag, title, excerpt, content, read_time, published, published_at)
values
  (
    'understanding-coronary-artery-disease',
    'professional',
    'Cardiology',
    'Understanding Coronary Artery Disease: When Surgery Is the Answer',
    'A plain-language guide to how CAD develops, how it is managed medically, and the surgical options when medications and stenting are insufficient.',
    E'Coronary artery disease (CAD) is the leading cause of death in South Africa and worldwide. It develops when the arteries supplying the heart muscle with blood become narrowed or blocked by a build-up of fatty deposits called plaque — a process known as atherosclerosis.\n\n## How Does It Develop?\n\nPlaque accumulates over years, often silently. Risk factors that accelerate the process include hypertension, diabetes, dyslipidaemia, smoking, obesity, and a family history of heart disease. As the arteries narrow, the heart muscle receives less oxygen-rich blood — particularly during exertion — causing the hallmark symptom of angina (chest tightness or pain).\n\n## Medical Management First\n\nThe first line of treatment for most patients is lifestyle modification and medication. Statins reduce plaque formation; beta-blockers and nitrates relieve angina; antiplatelet agents such as aspirin reduce clot risk. Many patients do well on this regimen for years.\n\nWhen medical therapy is insufficient, a cardiologist may recommend coronary angiography — an X-ray of the heart arteries — to map the disease. If a discrete blockage is found, a percutaneous coronary intervention (PCI, or "stenting") may open it.\n\n## When Surgery Becomes Necessary\n\nCoronary artery bypass grafting (CABG) is recommended when:\n\n- Three or more coronary arteries are significantly blocked (triple-vessel disease)\n- The left main coronary artery is involved (a high-risk pattern)\n- The heart''s pumping function is reduced (low ejection fraction)\n- Previous stenting has failed (restenosis)\n- Diabetes is present alongside multi-vessel disease (where bypass shows superior outcomes to stenting)\n\nDuring CABG, the surgeon harvests a blood vessel from elsewhere in the body — typically the internal mammary artery from the chest wall, or the saphenous vein from the leg — and creates a detour (bypass) around the blocked segment. Blood then flows through the graft, restoring circulation to the starved heart muscle.\n\n## What to Expect\n\nModern CABG is safe, with complication rates that continue to improve. Most patients spend five to seven days in hospital, return to light activity within four to six weeks, and experience durable relief of angina. Many randomised trials show that bypass offers better long-term survival than stenting for complex disease patterns.\n\nIf you have been told you may need a surgical opinion regarding coronary artery disease, I encourage you to arrange a consultation. Understanding your options thoroughly — with your own surgeon — is the most important step you can take.',
    '6 min read',
    true,
    '2026-06-22T09:00:00+02:00'
  ),
  (
    'lung-nodule-what-now',
    'professional',
    'Thoracic',
    'Your CT Showed a Lung Nodule — What Happens Next?',
    'Incidental lung nodules are increasingly detected. Here is how we risk-stratify them and when a surgical approach is indicated.',
    E'With CT scanning now performed routinely for many chest and abdominal complaints, the incidental discovery of a lung nodule has become increasingly common. A "nodule" is simply a small rounded opacity — in practical terms, a spot — seen on the scan, typically smaller than 3 centimetres.\n\nThe critical question, of course, is: what does it mean?\n\n## Most Nodules Are Not Cancer\n\nThe majority of incidentally found lung nodules are benign — caused by old granulomatous infections (such as tuberculosis, very prevalent in South Africa), small lymph nodes, or minor scarring. However, a proportion will represent early lung cancer or metastatic disease from another site, so they cannot be dismissed without proper assessment.\n\n## How We Risk-Stratify\n\nA structured approach is used, incorporating:\n\n**Size:** Nodules under 6mm carry very low risk and require only periodic surveillance. Those above 8mm warrant more active investigation.\n\n**Morphology:** Solid, part-solid, or pure "ground-glass" nodules each carry different implications. Irregular or spiculated (spiky) edges raise suspicion.\n\n**Growth over time:** A nodule that doubles in volume in less than 400 days is concerning. Stability over two years is reassuring.\n\n**Patient risk factors:** Smoking history, age, family history of lung cancer, and prior malignancy all influence the pretest probability.\n\nWe typically follow established guidelines (Fleischner Society or BTS) to decide the appropriate surveillance interval or escalation pathway.\n\n## When Surgery Is Indicated\n\nIf a nodule grows, has high-risk features, or cannot be safely characterised by biopsy, surgical resection is appropriate. This serves two purposes simultaneously: definitive diagnosis and potential cure, if the lesion proves malignant at an early stage.\n\nMost resections for nodules are performed using video-assisted thoracoscopic surgery (VATS) — keyhole surgery through small chest-wall incisions. Recovery is generally quicker than open thoracotomy, with most patients discharged within two to three days.\n\nThe most important message: if you have been told about a lung nodule, ensure it is being actively followed up. Do not assume that the absence of symptoms means the nodule can be ignored.',
    '5 min read',
    true,
    '2026-05-02T09:00:00+02:00'
  ),
  (
    'heart-valve-disease-signs',
    'professional',
    'Cardiology',
    'Heart Valve Disease: Symptoms You Should Not Ignore',
    'Valve disease often develops slowly. Understanding the warning signs can make the difference between a repair and a replacement.',
    E'The heart has four valves — mitral, aortic, tricuspid, and pulmonary — whose job is to ensure blood flows in one direction only through the heart''s chambers. When a valve leaks (regurgitation) or fails to open fully (stenosis), the heart must work harder to compensate, often for years before symptoms appear.\n\n## The Danger of Slow Progression\n\nThis gradual adaptation is both a feature and a hazard. Patients often feel well even as significant valve dysfunction develops. By the time breathlessness, fatigue, or ankle swelling become obvious, the heart may have already sustained irreversible changes. This is why regular echocardiographic surveillance of known valve disease is essential.\n\n## Warning Signs\n\nSeek assessment promptly if you experience:\n\n- Progressive shortness of breath on exertion (doing less than you used to for the same symptoms)\n- Waking at night breathless (orthopnoea or paroxysmal nocturnal dyspnoea)\n- Ankle or leg swelling\n- Palpitations or an irregular heartbeat (atrial fibrillation is commonly triggered by mitral valve disease)\n- Dizzy spells or fainting, especially with exertion (a serious warning sign in aortic stenosis)\n- A new heart murmur detected by your doctor\n\n## Repair vs Replacement\n\nWhen surgery is indicated, the aim is always to repair rather than replace a valve. A repaired native valve — particularly the mitral — lasts a lifetime without requiring blood thinning medication (anticoagulation). Replacement with a biological prosthesis avoids anticoagulation but may need revision after 10–15 years; a mechanical valve is more durable but requires lifelong anticoagulation.\n\nThe timing of surgery, and the choice of valve strategy, must be individualised. An early referral to a cardiothoracic surgeon — ideally while the valve is still repairable and before heart function has declined — gives the best long-term outcome.',
    '5 min read',
    true,
    '2026-03-10T09:00:00+02:00'
  ),
  (
    'lessons-from-the-operating-theatre',
    'personal',
    'Reflections',
    'Lessons the Operating Theatre Taught Me About Leadership',
    'Reflections on how the culture of a surgical team — communication, hierarchy, and trust under pressure — shapes outcomes far beyond the OR.',
    E'There are very few human environments where the consequences of poor communication are as immediate and as irreversible as in an operating theatre. I have been thinking lately about how much the theatre has shaped my understanding of what it means to lead well — and how rarely those lessons make it into management books.\n\n## The Spoken Assumption Is the Enemy\n\nIn surgery, an assumption left unspoken can kill someone. The scrub nurse assumes the surgeon has checked the implant size. The anaesthetist assumes the surgeon knows the patient is on warfarin. The registrar assumes the consultant knows the patient''s CT showed an anomalous vessel.\n\nGood surgical teams have a culture of explicit communication — not because they distrust each other, but because they understand that human memory is fallible, that attention narrows under pressure, and that a spoken check takes five seconds while an unsaid assumption can take a life.\n\nI try to apply this outside the theatre too. In meetings, in planning sessions, with my team. Say the thing. Confirm the thing. Do not assume the other person knows what you are thinking.\n\n## Hierarchy Serves a Purpose — but Not Every Purpose\n\nSurgical teams have clear hierarchy for good reason. When a decision must be made in sixty seconds, you cannot run a committee. The hierarchy exists to make decisions under pressure.\n\nBut I have learned — sometimes the hard way — that hierarchy kills innovation and psychological safety when it is treated as permanent. The scrub nurse who has done ten thousand cases may well see something the consultant has not. The junior doctor''s question that seems naive may identify a gap in your thinking.\n\nThe best surgical teams I have been part of had two modes: open discussion during planning, clear chain of command during execution. Knowing when to switch between them is the mark of a mature team.\n\n## You Cannot Perform at Your Best Without Rest\n\nThis one nearly broke me early in my career. The surgical culture of my training years did not reward vulnerability, and it certainly did not reward admitting fatigue. But the science is unambiguous: after prolonged sleep deprivation, fine motor skills, decision-making, and situational awareness deteriorate to a measurable degree.\n\nThe best thing I can do for my patients is sleep, eat, exercise, and arrive at theatre with my full cognitive and technical capacity. That is not weakness. That is professionalism.\n\nI write this not as a lecture but as a reminder to myself. The theatre teaches relentlessly, if you are paying attention.',
    '4 min read',
    false,
    null
  ),
  (
    'why-i-became-a-surgeon',
    'personal',
    'Life',
    'Why I Became a Surgeon',
    'An honest account of the path that led from curiosity to scalpel — and what keeps the calling alive after years in theatre.',
    E'People ask this question in different ways. Sometimes it is genuine curiosity. Sometimes it carries an undertone — implying that medicine is an unusual path for someone who looks like me, from where I come from. I choose to hear only the curiosity, and I try to answer honestly.\n\n## It Started With a Desire to Help\n\nMy family has always had someone with a heart condition. From my grandmother, mother and aunts. I have sat in many a waiting room, watching the doctors move purposefully down corridors, and wondering what they knew that no one would tell me.\n\nThat wondering never left.\n\n## The Long Road\n\nMedicine in South Africa is not a short path. MBBCh is six years. Internship. Community service. Specialist training in general surgery, then cardiothoracic surgery — another five to eight years of registrarship and fellowship. By the time I was fully qualified, I had been in formal training for the better part of two decades.\n\nPeople sometimes romanticise this. The reality includes missed family events, chronic exhaustion, moments of genuine doubt, and a financial cost that most professionals in other fields would find startling.\n\nI am not sharing this for sympathy. I am sharing it because I think it is important to be honest about what the actual cost of training is, rather than presenting it as pure romance.\n\n## What Keeps It Alive\n\nAfter years in theatre, the honest answer is this: the moment a patient who came in struggling to breathe, or clutching their chest, or frightened of a shadow on their scan — the moment that patient walks out of hospital — that moment has not become routine.\n\nI hope it never does.\n\nAnd I think about my young self in that waiting room. I try to be the doctor who explains things. Who treats the question as worthy of a real answer. Who makes the waiting less opaque.\n\nThat, more than anything, is why I became a surgeon.',
    '4 min read',
    false,
    null
  )
on conflict (slug) do nothing;
