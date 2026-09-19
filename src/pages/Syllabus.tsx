import { ArrowLeft, Check, Circle, LockKeyhole } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LESSON_LIST } from '@/data/authored-lessons';
import { COURSE_OUTCOMES } from '@/data/course-outcomes';
import { describeObjective } from '@/data/objectives';
import { UNITS } from '@/data/unit-tests';

const UNIT_GUIDE: Record<number, { title: string; objective: string; assessment: string }> = {
  1: {
    title: 'People and things',
    objective: 'Read and build the people-and-things part of a short statement using nouns, definiteness, pronouns, and subject marking.',
    assessment: 'Unseen reading, form recognition, and short production',
  },
  2: {
    title: 'Signals and actions',
    objective: 'Use signals, fused subjects, verb endings, and word order to decode and build short present-tense statements.',
    assessment: 'Cumulative reading, signal choice, ordering, and production',
  },
};

const PLANNED_UNITS = [
  {
    id: 3,
    title: 'Bend the shape',
    objective: 'Change a statement through time, negation, and questions while tracking what changes in the DO and SIGNAL positions.',
    lessons: ['When it happens', 'Saying “not”', 'Asking questions'],
    note: 'Sequence under review. Negation is planned before questions; lessons are not yet available.',
  },
  {
    id: 4,
    title: 'Decorate the boxes',
    objective: 'Add descriptions, amounts, and place or instrument phrases to the statement shape.',
    lessons: ['Describing words', 'Numbers and amounts', 'Where and with what'],
    note: 'Planned outline. Source verification is still open, especially for numerals.',
  },
];

export default function SyllabusPage() {
  const navigate = useNavigate();
  return (
    <div className="syllabus-page min-h-[100dvh] bg-bg text-label">
      <header className="glass glass-top sticky top-0 z-20 border-b border-separator pt-safe-t">
        <div className="mx-auto flex h-14 max-w-[54rem] items-center px-3 sm:px-5">
          <button onClick={() => navigate('/learn')} aria-label="Back to course" className="grid h-10 w-10 place-items-center rounded-full active:bg-fill"><ArrowLeft size={22}/></button>
          <h1 className="ml-2 text-headline font-semibold">Syllabus</h1>
        </div>
      </header>

      <main className="syllabus-article mx-auto max-w-[46rem] px-5 pb-[calc(5rem+var(--safe-b))] pt-10 sm:px-8 sm:pt-14">
        <section>
          <h2 className="text-large font-bold tracking-tight">Learn to read the structure of a Somali statement.</h2>
          <p className="mt-4 max-w-[42rem] text-body leading-relaxed text-label-2">This is a text-first foundation course. You learn to notice the parts of a written statement, use their clues, and build short statements of your own.</p>
        </section>

        <section className="syllabus-section">
          <h2>Course outcomes</h2>
          <ol className="mt-5 space-y-5">
            {COURSE_OUTCOMES.map((outcome, index) => (
              <li key={outcome.id} className="grid grid-cols-[2rem_1fr] gap-3">
                <span className="text-title3 font-light tabular-nums text-label-3">{String(index + 1).padStart(2, '0')}</span>
                <p className="text-body leading-relaxed">{outcome.canDo.replace(/^I can /, '')}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="syllabus-section">
          <div className="flex items-baseline justify-between gap-4"><h2>Roadmap</h2><span className="text-footnote text-label-3">2 units · 8 lessons</span></div>
          <div className="mt-8 space-y-14">
            {UNITS.map((unit) => {
              const guide = UNIT_GUIDE[unit.id];
              const lessons = LESSON_LIST.filter((lesson) => unit.lessonIds.includes(lesson.lessonId));
              return (
                <article key={unit.id}>
                  <div className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="text-title1 font-light tabular-nums text-label-3">{String(unit.id).padStart(2, '0')}</span>
                    <div>
                      <h3 className="text-title1 font-bold">{guide.title}</h3>
                      <p className="mt-3 text-body leading-relaxed text-label-2">{guide.objective}</p>
                    </div>
                  </div>
                  <ol className="roadmap-line ml-5 mt-7 border-l border-separator pl-8">
                    {lessons.map((lesson, lessonIndex) => (
                      <li key={lesson.lessonId} className="relative pb-8 last:pb-5">
                        <span className="roadmap-dot absolute -left-[2.23rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-bg"><Circle size={9} fill="currentColor" /></span>
                        <p className="text-caption1 text-label-3">Lesson {lesson.lessonId}</p>
                        <h4 className="mt-0.5 text-headline font-semibold">{lesson.title}</h4>
                        <ul className="mt-2 space-y-1 text-footnote leading-relaxed text-label-2">
                          {unit.lessonIds.includes(lesson.lessonId) && describeLessonObjectives(lesson.lessonId).map((label) => <li key={label}>{label}</li>)}
                        </ul>
                        {lessonIndex < lessons.length - 1 && <p className="mt-3 text-caption1 text-label-3">Builds into Lesson {lessons[lessonIndex + 1].lessonId}</p>}
                      </li>
                    ))}
                    <li className="relative">
                      <span className="absolute -left-[2.23rem] top-1 grid h-4 w-4 place-items-center rounded-full bg-label text-bg"><Check size={10} strokeWidth={3}/></span>
                      <p className="text-body font-semibold">Unit Test</p>
                      <p className="mt-1 text-footnote leading-relaxed text-label-2">{guide.assessment}</p>
                    </li>
                  </ol>
                </article>
              );
            })}
          </div>
        </section>

        <section className="syllabus-section">
          <h2>What comes next</h2>
          <p className="mt-3 text-body leading-relaxed text-label-2">These units show the direction of the course. Their lesson order and wording may change as the source review closes.</p>
          <div className="mt-8 divide-y divide-separator border-y border-separator">
            {PLANNED_UNITS.map((unit) => (
              <article key={unit.id} className="py-7">
                <div className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="text-title1 font-light tabular-nums text-label-3">{String(unit.id).padStart(2, '0')}</span>
                  <div>
                    <h3 className="flex items-center gap-2 text-title2 font-bold"><LockKeyhole size={15}/>{unit.title}</h3>
                    <p className="mt-3 text-body leading-relaxed text-label-2">{unit.objective}</p>
                    <ol className="mt-4 space-y-2 text-body">{unit.lessons.map((lesson, i) => <li key={lesson} className="flex gap-3"><span className="w-5 text-label-3">{9 + (unit.id === 4 ? 3 : 0) + i}</span><span>{lesson}</span></li>)}</ol>
                    <p className="mt-4 text-footnote leading-relaxed text-label-3">{unit.note}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="syllabus-section">
          <h2>How your work is checked</h2>
          <div className="mt-5 space-y-5 text-body leading-relaxed">
            <p><strong>During a lesson:</strong> guided reading becomes recall, short production, then a fresh passage.</p>
            <p><strong>After a lesson:</strong> due review and homework return later, so memory has to survive a delay.</p>
            <p><strong>At a unit milestone:</strong> unseen reading and cumulative items check whether the clues transfer beyond the page that taught them.</p>
          </div>
        </section>

        <section className="syllabus-section">
          <h2>Scope and sources</h2>
          <p className="mt-4 text-body leading-relaxed text-label-2">The current course teaches reading and short written production. It does not yet claim listening, speaking, or pronunciation.</p>
          <p className="mt-4 text-body leading-relaxed text-label-2">The current sequence is grounded chiefly in Morgan Nilsson’s <em>Beginner’s Somali Grammar</em> and Martin Orwin’s <em>Colloquial Somali</em>. John I. Saeed’s <em>Somali</em> strengthens the roadmap for focus, <em>waa</em>, word order, past tense, and questions. Older and derivative materials are supporting references, not the sole authority for a rule.</p>
        </section>
      </main>
    </div>
  );
}

function describeLessonObjectives(lessonId: number): string[] {
  const outcomeIds = COURSE_OUTCOMES.flatMap((outcome) => outcome.objectiveIds);
  return [...new Set(outcomeIds.map(describeObjective).filter((item) => item.lessonId === lessonId).map((item) => item.label))];
}
