"use client";

import { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import type { PopBuilder as BuilderSpec, SketchKind } from "@/lib/types";
import Sketch from "@/components/draw/Sketch";
import Bi, { biString, type Langs } from "@/components/luxe/Bi";
import { formatSum, orderUrl } from "@/lib/orderLink";
import styles from "./PopProfile.module.css";

const KINDS: SketchKind[] = ["bento", "round", "tiers"];

/**
 * "Build your cake": three rows of chips (occasion, size, flavour). The cake
 * drawing and the price follow the choices, and the send button opens the
 * chat with the whole choice written out.
 */
export default function PopBuilder({
  builder,
  order,
  langs,
  ink,
}: {
  builder: BuilderSpec;
  order: string;
  langs: Langs;
  ink: string;
}) {
  const [occasion, setOccasion] = useState(0);
  const [size, setSize] = useState(Math.min(1, builder.sizes.length - 1));
  const [flavor, setFlavor] = useState(0);

  const chosenSize = builder.sizes[size];
  const chosenFlavor = builder.flavors[flavor];
  const kind = KINDS[Math.min(size, KINDS.length - 1)];

  const message = biString(builder.message, langs)
    .replace("{occasion}", biString(builder.occasions[occasion].label, langs))
    .replace("{size}", `${biString(chosenSize.label, langs)} (${biString(chosenSize.serves, langs)})`)
    .replace("{flavor}", biString(chosenFlavor.name, langs))
    .replace("{price}", `${formatSum(chosenSize.price)} ${biString(builder.currency, langs)}`);

  return (
    <div className={styles.builder}>
      <div className={styles.builderPreview} aria-hidden>
        <Sketch
          key={`${kind}-${chosenFlavor.id}`}
          spec={{ kind, color: chosenFlavor.color, topper: kind === "tiers" ? "flower" : kind === "bento" ? "heart" : "cherry" }}
          variant="sticker"
          ink={ink}
          className={styles.builderCake}
        />
      </div>

      <fieldset className={styles.chipGroup}>
        <legend>
          <Bi t={builder.occasionsLabel} langs={langs} />
        </legend>
        <div className={styles.chips}>
          {builder.occasions.map((o, i) => (
            <button key={o.id} type="button" className={styles.chip} aria-pressed={i === occasion} onClick={() => setOccasion(i)}>
              <Bi t={o.label} langs={langs} />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.chipGroup}>
        <legend>
          <Bi t={builder.sizesLabel} langs={langs} />
        </legend>
        <div className={styles.chips}>
          {builder.sizes.map((s, i) => (
            <button key={s.id} type="button" className={`${styles.chip} ${styles.chipTall}`} aria-pressed={i === size} onClick={() => setSize(i)}>
              <span>
                <Bi t={s.label} langs={langs} />
              </span>
              <small>
                <Bi t={s.serves} langs={langs} />
              </small>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className={styles.chipGroup}>
        <legend>
          <Bi t={builder.flavorsLabel} langs={langs} />
        </legend>
        <div className={styles.chips}>
          {builder.flavors.map((f, i) => (
            <button key={f.id} type="button" className={styles.chip} aria-pressed={i === flavor} onClick={() => setFlavor(i)}>
              <i className={styles.swatch} style={{ background: f.color }} aria-hidden />
              <Bi t={f.name} langs={langs} />
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.total}>
        <div>
          <p className={styles.totalLabel}>
            <Bi t={builder.totalLabel} langs={langs} />
          </p>
          <p className={styles.totalSum} key={chosenSize.id} aria-live="polite">
            {formatSum(chosenSize.price)} <span><Bi t={builder.currency} langs={langs} /></span>
          </p>
        </div>
        <a href={orderUrl(order, message)} target="_blank" rel="noopener noreferrer" className={styles.sendBtn}>
          <PaperAirplaneIcon className="size-5" aria-hidden />
          <Bi t={builder.sendLabel} langs={langs} />
        </a>
      </div>
    </div>
  );
}
