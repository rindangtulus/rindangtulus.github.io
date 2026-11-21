---
title: Rain Mandarin
subtitle: 學華語 · Belajar Mandarin Taiwan
code: P-01
order: 1
role: Product Owner, Designer & Solo Developer
stack: [Dexie, Vitest, PWA, Claude Code]
# Dikonfirmasi 2026-11-21: `npx vitest run` = 1046 tes lulus di 44 berkas. Di situs tetap "1,000+".
summary: A 7-section, offline-capable PWA for Traditional-character Mandarin, backed by 1,000+ Vitest tests.
version: '0.2.0'
links:
  demo: https://belajar-mandarin-alpha.vercel.app/
caseStudy: true
cover: ../../assets/projects/belajar-mandarin/laptop-beranda.png
coverAlt: Laptop home dashboard with sidebar navigation, today's reviews, word of the day, streak, accuracy and an activity heatmap
gallery:
  - image: ../../assets/projects/belajar-mandarin/laptop-kartu-sesi.png
    alt: 'Flashcard answer side: 再見 with pinyin, bopomofo and meaning, an example sentence, and four grading buttons with next intervals'
    caption: Spaced-repetition review. Grade each card (Lagi, Sulit, Bagus, Mudah) and see the next interval.
  - image: ../../assets/projects/belajar-mandarin/laptop-kosakata.png
    alt: Vocabulary list of ten words with pinyin, meanings and learning-status tags, above search, sort and tag controls
    caption: Vocabulary list with search, filters, and a status for every word, from not yet learned to mastered.
  - image: ../../assets/projects/belajar-mandarin/laptop-menulis.png
    alt: Writing practice grid of sixteen characters with status dots, a practice button, and an empty stroke-order panel
    caption: Writing. Pick a character, see its stroke order, then practice.
  - image: ../../assets/projects/belajar-mandarin/laptop-tata-bahasa.png
    alt: Grammar page with three sentence-pattern cards, each with an example, translation, explanation and status
    caption: Grammar patterns such as subject + 想 + verb + object, with examples and practice progress.
  - image: ../../assets/projects/belajar-mandarin/laptop-angka.png
    alt: 'Numbers and time page: a mini quiz on numbers and a converter comparing three-digit and four-digit grouping'
    caption: Numbers and time. Mandarin four-digit grouping, explained next to the familiar one.
  - image: ../../assets/projects/belajar-mandarin/laptop-nada-progres.png
    alt: 'Tone progress: accuracy bars for tones 1 to 4, accuracy by question type, and a grid of commonly confused tones'
    caption: Tone progress and a confusion matrix of mixed-up tones.
  - image: ../../assets/projects/belajar-mandarin/phone-beranda.png
    alt: 'Phone home screen: greeting, a Today card with reviews and daily target, a start button, and a word-of-the-day card'
    caption: Home on a phone. Today's reviews and the word of the day.
  - image: ../../assets/projects/belajar-mandarin/phone-nada-latihan.png
    alt: 'Tone listening exercise on a phone: prompt, contour hint switch, replay and slow buttons, three character choices'
    caption: Tone practice. Listen to the audio, then pick the matching character.
---

## Context

I was a beginner student in a Taiwanese Mandarin class, learning Traditional characters. Common language apps did not follow my class material, many of them used Simplified characters, and few were in Indonesian.

## Problem

I needed one place to keep the vocabulary from class, review it on a proper schedule, practice writing, and cover grammar, numbers and time, and tones.

## My role

I was product owner, designer and sole developer, using AI-assisted development (Claude Code) with a plan-first workflow: draft, review, implement, test, then commit per feature.

## Process

I worked from a seven-step roadmap with a branch per feature, Conventional Commits, and Semantic Versioning with a CHANGELOG. Logic lives in pure functions that are tested, and I migrated the Dexie schema in small steps.

## Outcome

The app has seven study sections (Vocabulary, SRS cards, Writing, Grammar, Numbers and Time, Tones, and Home), 1,000+ Vitest tests, an installable PWA that works offline, and a deployment on Vercel.

## What I learned

I learned how to design local-first data, keep old backups readable, write clear prompts and briefs for AI, and split a product into small releases.

## Technical highlights

- SM-2 scheduling with a learning phase and an Undo action.
- 3D flip cards with swipe gestures.
- An activity registry that feeds streaks and the heatmap.
- Mandarin rules modeled in code: <span lang="zh-Hant">萬</span>/<span lang="zh-Hant">億</span> number grouping, <span lang="zh-Hant">零</span> and <span lang="zh-Hant">兩</span> usage, <span lang="zh-Hant">一</span>/<span lang="zh-Hant">不</span> tone sandhi, and a filter for third-tone pairs (3-3).
- A pinyin mode for beginners.
- Accessibility and reduced-motion support.
