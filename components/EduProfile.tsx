import type { CSSProperties } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import type {
  EduBranch,
  EduCourse,
  EduResult,
  EduTeacher,
  EduTone,
  LinkItem,
  LinkType,
  SiteConfig,
} from "@/lib/types";
import { LinkIcon } from "./icons";
import HubCarousel from "./HubCarousel";

const TONES: Record<EduTone, { bg: string; deep: string; ink: string }> = {
  indigo: { bg: "#E0E7FF", deep: "#C7D2FE", ink: "#3730A3" },
  amber: { bg: "#FEF3C7", deep: "#FDE68A", ink: "#92400E" },
  emerald: { bg: "#D1FAE5", deep: "#A7F3D0", ink: "#065F46" },
  rose: { bg: "#FFE4E6", deep: "#FECDD3", ink: "#9F1239" },
  sky: { bg: "#E0F2FE", deep: "#BAE6FD", ink: "#075985" },
  violet: { bg: "#EDE9FE", deep: "#DDD6FE", ink: "#5B21B6" },
};

const LINK_TONE: Partial<Record<LinkType, EduTone>> = {
  phone: "emerald",
  contact: "amber",
  telegram: "sky",
  instagram: "rose",
  whatsapp: "emerald",
  youtube: "rose",
  location: "violet",
};

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--tpl-primary)";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function externalProps(url: string) {
  return url.startsWith("tel:") ? {} : { target: "_blank", rel: "noopener noreferrer" };
}

function ChevronRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5 shrink-0 opacity-50 transition-transform duration-200 group-hover:translate-x-0.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4 lg:mb-6">
      <h2 className="text-xl font-extrabold tracking-tight text-balance lg:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-(--tpl-ink)/70 lg:text-base">{subtitle}</p>}
    </div>
  );
}

function CourseCard({ course }: { course: EduCourse }) {
  const tone = TONES[course.tone];
  return (
    <li
      className="rounded-2xl p-4 lg:p-5"
      style={{ backgroundColor: tone.bg, color: tone.ink }}
    >
      <span className="flex size-10 items-center justify-center rounded-xl bg-white/70">
        <LinkIcon type="education" className="size-5" />
      </span>
      <div className="mt-3 text-base leading-snug font-extrabold lg:text-lg">{course.title}</div>
      {course.meta && <div className="mt-0.5 text-sm opacity-85">{course.meta}</div>}
    </li>
  );
}

function TeacherCard({ teacher }: { teacher: EduTeacher }) {
  const tone = TONES[teacher.tone];
  return (
    <article className="w-44 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 lg:w-56">
      <div
        className="relative aspect-[4/5] w-full overflow-hidden"
        style={{ background: `linear-gradient(150deg, ${tone.bg}, ${tone.deep})` }}
      >
        {teacher.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={teacher.photoUrl}
            alt={teacher.name}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <span
              className="absolute -top-8 -right-8 size-32 rounded-full bg-white/40"
              aria-hidden="true"
            />
            <span
              className="absolute -bottom-10 -left-6 size-28 rounded-full bg-white/30"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold tracking-tight"
              style={{ color: tone.ink, opacity: 0.85 }}
              aria-hidden="true"
            >
              {initials(teacher.name)}
            </span>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base leading-snug font-bold">{teacher.name}</h3>
        <p className="mt-0.5 text-sm text-(--tpl-ink)/70">{teacher.role}</p>
        {teacher.experience && (
          <span
            className="mt-2.5 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
            style={{ backgroundColor: tone.bg, color: tone.ink }}
          >
            {teacher.experience}
          </span>
        )}
      </div>
    </article>
  );
}

function ResultCard({ result }: { result: EduResult }) {
  const tone = TONES[result.tone];

  if (result.photoUrl) {
    return (
      <article className="w-64 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 lg:w-80">
        <div className="aspect-[4/3] w-full overflow-hidden" style={{ backgroundColor: tone.bg }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={result.photoUrl}
            alt={`${result.title}${result.student ? ` — ${result.student}` : ""}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold">{result.title}</h3>
          {result.student && <p className="text-sm text-(--tpl-ink)/70">{result.student}</p>}
        </div>
      </article>
    );
  }

  return (
    <article className="aspect-[4/3] w-64 rounded-3xl bg-white p-2.5 shadow-sm ring-1 ring-black/5 lg:w-80">
      <div
        className="flex h-full flex-col items-center justify-center rounded-2xl border-2 px-3 text-center"
        style={{
          borderColor: tone.deep,
          background: `linear-gradient(160deg, #ffffff 30%, ${tone.bg})`,
          color: tone.ink,
        }}
      >
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
          Sertifikat
        </span>
        <span
          className="my-2 flex size-10 items-center justify-center rounded-full text-white"
          style={{ backgroundColor: tone.ink }}
        >
          <LinkIcon type="impact" className="size-5" />
        </span>
        <div className="text-2xl leading-tight font-extrabold tracking-tight lg:text-3xl">
          {result.title}
        </div>
        {result.student && <div className="mt-1 text-sm opacity-85">{result.student}</div>}
      </div>
    </article>
  );
}

function BranchCard({ branch }: { branch: EduBranch }) {
  const tone = TONES[branch.tone];
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
      <div
        className="relative aspect-[2/1] w-full overflow-hidden sm:aspect-[16/10]"
        style={{ background: `linear-gradient(150deg, ${tone.bg}, ${tone.deep})` }}
      >
        {branch.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={branch.photoUrl}
            alt={branch.name}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <span
              className="absolute -top-10 -right-10 size-40 rounded-full bg-white/40"
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 flex items-center justify-center"
              style={{ color: tone.ink, opacity: 0.75 }}
              aria-hidden="true"
            >
              <LinkIcon type="branch" className="size-16" />
            </span>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-extrabold tracking-tight">{branch.name}</h3>
        <ul className="mt-3 space-y-2 text-sm text-(--tpl-ink)/80">
          <li className="flex items-start gap-2.5">
            <LinkIcon type="location" className="mt-0.5 size-5 shrink-0" />
            <span>{branch.address}</span>
          </li>
          {branch.hours && (
            <li className="flex items-start gap-2.5">
              <ClockIcon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
              <span>{branch.hours}</span>
            </li>
          )}
        </ul>

        <div className={`mt-auto grid gap-2 pt-5 ${branch.phone ? "grid-cols-2" : "grid-cols-1"}`}>
          <a
            href={branch.mapUrl}
            {...externalProps(branch.mapUrl)}
            className={`flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-white px-3 text-sm font-bold text-(--tpl-ink) ring-1 ring-black/15 transition-[transform,background-color] duration-200 hover:bg-black/[0.03] active:scale-[0.97] ${FOCUS_RING}`}
          >
            <LinkIcon type="location" className="size-4" />
            Xaritada
          </a>
          {branch.phone && (
            <a
              href={telHref(branch.phone)}
              className={`flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-(--tpl-primary) px-3 text-sm font-bold text-white transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.97] ${FOCUS_RING}`}
            >
              <LinkIcon type="phone" className="size-4" />
              Qo&apos;ng&apos;iroq
            </a>
          )}
        </div>
        {branch.phone && (
          <div className="mt-2 text-center text-xs text-(--tpl-ink)/70 tabular-nums">
            {branch.phone}
          </div>
        )}
      </div>
    </article>
  );
}

function ActionLink({ link }: { link: LinkItem }) {
  const tone = TONES[LINK_TONE[link.type] ?? "indigo"];
  return (
    <a
      href={link.url}
      {...externalProps(link.url)}
      className={`group flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl bg-white px-3 py-2.5 ring-1 ring-black/5 transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.98] ${FOCUS_RING}`}
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: tone.bg, color: tone.ink }}
      >
        <LinkIcon type={link.type} className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] leading-tight font-bold">{link.label}</span>
        {link.description && (
          <span className="mt-0.5 block truncate text-sm text-(--tpl-ink)/70">
            {link.description}
          </span>
        )}
      </span>
      <ChevronRight />
    </a>
  );
}

export default function EduProfile({ site }: { site: SiteConfig }) {
  const edu = site.edu ?? {};
  const theme = site.theme ?? {};
  const primary = theme.accent ?? "#4F46E5";
  const cta = theme.secondaryAccent ?? "#C2410C";
  const ink = theme.textColor ?? "#1E1B4B";
  const background = theme.background ?? "linear-gradient(180deg,#eef2ff 0%,#ffffff 55%)";

  const stats = edu.stats ?? [];
  const courses = edu.courses ?? [];
  const teachers = edu.teachers ?? [];
  const results = edu.results ?? [];
  const branches = edu.branches ?? [];
  const callLink = site.links.find((link) => link.type === "phone");

  const rootStyle = {
    background,
    color: ink,
    ["--tpl-primary" as string]: primary,
    ["--tpl-cta" as string]: cta,
    ["--tpl-ink" as string]: ink,
  } as CSSProperties;

  const ctaClass = `inline-flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-(--tpl-cta) px-7 text-base font-bold text-white shadow-[0_12px_24px_-10px_var(--tpl-cta)] transition-[transform,filter] duration-200 hover:brightness-110 active:scale-[0.98] lg:w-auto ${FOCUS_RING}`;

  return (
    <main
      className="relative isolate min-h-dvh overflow-x-clip pb-28 lg:pb-0"
      style={rootStyle}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-(--tpl-primary) opacity-[0.10] blur-3xl lg:left-[30%]" />
        <div className="absolute top-40 -right-24 size-[360px] rounded-full bg-(--tpl-cta) opacity-[0.07] blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md px-4 pt-10 lg:max-w-6xl lg:px-8 lg:pt-20">
        <header className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div
              className="linkhub-enter flex size-24 items-center justify-center overflow-hidden rounded-full bg-(--tpl-primary) text-4xl font-extrabold text-white shadow-lg ring-4 ring-white lg:size-28"
              style={{ animationDelay: "0ms" }}
            >
              {site.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={site.avatarUrl}
                  alt={site.name}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              ) : (
                initials(site.name) || "?"
              )}
            </div>

            <h1
              className="linkhub-enter mt-5 text-3xl font-extrabold tracking-tight text-balance lg:text-5xl"
              style={{ animationDelay: "70ms" }}
            >
              {site.name}
            </h1>
            {site.bio && (
              <p
                className="linkhub-enter mt-2 max-w-prose text-base text-balance text-(--tpl-ink)/75 lg:mt-4 lg:text-lg"
                style={{ animationDelay: "130ms" }}
              >
                {site.bio}
              </p>
            )}

            {edu.cta && (
              <div
                className="linkhub-enter mt-6 flex w-full flex-col gap-3 sm:flex-row lg:mt-8 lg:w-auto"
                style={{ animationDelay: "190ms" }}
              >
                <a href={edu.cta.url} {...externalProps(edu.cta.url)} className={ctaClass}>
                  {edu.cta.label}
                </a>
                {callLink && (
                  <a
                    href={callLink.url}
                    className={`hidden min-h-12 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-white px-6 text-base font-bold text-(--tpl-ink) ring-1 ring-black/15 transition-[transform,background-color] duration-200 hover:bg-black/[0.03] active:scale-[0.98] lg:inline-flex ${FOCUS_RING}`}
                  >
                    <LinkIcon type="phone" className="size-5" />
                    {callLink.description ?? callLink.label}
                  </a>
                )}
              </div>
            )}

            {stats.length > 0 && (
              <dl
                className="linkhub-enter mt-6 grid w-full grid-cols-3 gap-3 lg:mt-10 lg:max-w-lg"
                style={{ animationDelay: "250ms" }}
              >
                {stats.map((stat) => (
                  <div
                    key={stat.id}
                    className="flex flex-col-reverse justify-end rounded-2xl bg-white/80 px-2 py-3 ring-1 ring-black/5 lg:px-5 lg:py-4"
                  >
                    <dt className="mt-0.5 text-xs leading-tight text-(--tpl-ink)/75 lg:text-sm">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-extrabold text-(--tpl-primary) tabular-nums lg:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>

          <nav
            aria-label="Bog'lanish"
            className="linkhub-enter w-full lg:rounded-3xl lg:bg-white/60 lg:p-5 lg:shadow-sm lg:ring-1 lg:ring-black/5 lg:backdrop-blur"
            style={{ animationDelay: "310ms" }}
          >
            <ul className="flex flex-col gap-2.5">
              {site.links.map((link) => (
                <li key={link.id}>
                  <ActionLink link={link} />
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <div className="mt-14 space-y-14 lg:mt-24 lg:space-y-24">
          {courses.length > 0 && (
            <section aria-label={edu.coursesTitle ?? "Yo'nalishlar"}>
              <SectionHeader title={edu.coursesTitle ?? "Yo'nalishlar"} />
              <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
                {courses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </ul>
            </section>
          )}

          {teachers.length > 0 && (
            <HubCarousel
              title={edu.teachersTitle ?? "Ustozlarimiz"}
              subtitle={edu.teachersSubtitle}
              label="Ustozlar ro'yxati"
              speed={26}
            >
              {teachers.map((teacher) => (
                <TeacherCard key={teacher.id} teacher={teacher} />
              ))}
            </HubCarousel>
          )}

          {results.length > 0 && (
            <HubCarousel
              title={edu.resultsTitle ?? "O'quvchilarimiz natijalari"}
              subtitle={edu.resultsSubtitle}
              label="O'quvchilar natijalari va sertifikatlar"
              speed={22}
            >
              {results.map((result) => (
                <ResultCard key={result.id} result={result} />
              ))}
            </HubCarousel>
          )}

          {branches.length > 0 && (
            <section aria-label={edu.branchesTitle ?? "Filiallarimiz"}>
              <SectionHeader title={edu.branchesTitle ?? "Filiallarimiz"} subtitle={edu.branchesSubtitle} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {branches.map((branch) => (
                  <BranchCard key={branch.id} branch={branch} />
                ))}
              </div>
            </section>
          )}
        </div>

        {!site.hideBranding && (
          <footer className="mt-16 pb-8 text-center text-xs text-(--tpl-ink)/60 lg:mt-24 lg:pb-12">
            <span className="font-semibold">ownlink.uz</span> bilan yaratilgan
          </footer>
        )}
      </div>

      {edu.cta && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/5 bg-white/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md lg:hidden">
          <div className="mx-auto flex max-w-md gap-3">
            {callLink && (
              <a
                href={callLink.url}
                aria-label={callLink.description ? `Qo'ng'iroq: ${callLink.description}` : callLink.label}
                className={`flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-white text-(--tpl-primary) ring-1 ring-black/15 transition-transform duration-200 active:scale-95 ${FOCUS_RING}`}
              >
                <LinkIcon type="phone" className="size-6" />
              </a>
            )}
            <a href={edu.cta.url} {...externalProps(edu.cta.url)} className={ctaClass}>
              {edu.cta.label}
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
