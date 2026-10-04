"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { playHoverTick, playTap } from "./ui-sounds";

const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  trigger?: "view" | "load";
};

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  trigger = "view",
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? -22 : direction === "right" ? 22 : 0;
  const initial = reduceMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset, y: direction === "up" ? 22 : 0 };
  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={trigger === "load" ? visible : undefined}
      whileInView={trigger === "view" ? visible : undefined}
      viewport={{ once: true, amount: 0.16, margin: "0px 0px -5% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.68, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.56, ease },
  },
};

export function StaggerGrid({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={staggerVariants}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -4% 0px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className, soundHover = true }: { children: ReactNode; className?: string; soundHover?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={childVariants}
      whileHover={reduceMotion ? undefined : { y: -3 }}
      onHoverStart={soundHover ? playHoverTick : undefined}
      transition={{ duration: 0.24, ease }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className: string;
  href: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.a
      className={className}
      href={href}
      onHoverStart={playHoverTick}
      onClick={(event) => {
        const isLocal = href.startsWith("#") || href.startsWith("/");
        const isPlainClick = event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
        if (isLocal && isPlainClick) playTap();
      }}
      whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.a>
  );
}

export function InteractiveCard({
  children,
  className,
  featured = false,
}: {
  children: ReactNode;
  className: string;
  featured?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      className={className}
      onHoverStart={playHoverTick}
      whileHover={reduceMotion ? undefined : {
        y: featured ? -20 : -6,
        scale: 1.012,
        boxShadow: featured ? "0 24px 60px rgba(0,0,0,.24)" : "0 16px 36px rgba(0,0,0,.12)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      {children}
    </motion.article>
  );
}

export function HeroMockups() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [12, -24]);

  return (
    <motion.div
      ref={ref}
      className="hero-phones"
      aria-label="Telas do aplicativo Agenda Barber"
      initial={reduceMotion ? false : { opacity: 0, x: 30, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      style={{ y: reduceMotion ? 0 : parallaxY }}
      transition={{ duration: 0.9, delay: 0.18, ease }}
    >
      <motion.img
        className="phone-confirm"
        src="/assets/booking-confirmation.png"
        alt="Confirmação de agendamento no aplicativo"
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.img
        className="phone-calendar"
        src="/assets/booking-phone.png"
        alt="Escolha de data e horário no aplicativo"
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
