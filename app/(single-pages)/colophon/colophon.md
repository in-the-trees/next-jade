## Framework

I've built this site with [Next.js](https://nextjs.org), a React framework.

I chose Next.js for a few reasons, but first: a brief history of what I was using before. Previously, my site was a static Hugo site using a [custom theme](https://github.com/in-the-trees/micro.blog-hugo) and hosted [on Micro.blog](https://help.micro.blog/t/custom-themes/59). Quickly, I reached a point where I was stretching beyond what Hugo was designed for — I needed something more *reactive*. I also wanted more control over my hosting. Thus, I evaluated my options.

As part of my evaluation, I went through the [Next.js Learn](https://nextjs.org/learn) mini-course and thought, "this rocks." The main aspect that stood out to me was server-side rendering — this was my first introduction to it. I thought it was really cool how, because the initial HTML is rendered on the server, even clients without JavaScript can still have a respectable experience. At the time, I was just learning React in school, so I jumped at the opportunity to learn something beyond create-react-app lol

## Hosting

I've chosen to host this site on [Cloudflare Pages](https://pages.cloudflare.com) using the [next-on-pages](https://github.com/cloudflare/next-on-pages) adapter.

First and foremost, the reason I chose Cloudflare over Vercel is cost — you get more mileage out of Cloudflare's free tier than you do with Vercel's. Realistically, I would probably be fine on Vercel's free tier, but I like the extra headroom.

Hosting a Next.js site on Cloudflare does not come without it's set of challenges, however. These challenges largely stem from the restriction to the [Edge Runtime](https://nextjs.org/docs/app/building-your-application/rendering/edge-and-nodejs-runtimes) which has a lesser number of supported APIs.

### Analytics

I do use analytics on this site, specifically [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/). It's free, privacy-friendly, and gives me adequate enough insights.

I don't check my analytics all too often.

### Domain

inthetrees.me is registered via [Cloudflare](https://www.cloudflare.com/products/registrar/).

I've traditionally used Porkbun as my registrar, but I wanted to give Cloudflare's Registrar a try. I still prefer Porkbun; when my domain is due for renewal, I'll be conisidering transferring it to Porkbun.

## Development environment

### Device

I do all my development on a 16" MacBook Pro (2021). I \<3 my MacBook.

### Operating system

Of course, I'm using macOS. Typically, I'm running the latest developer beta.

The heading "operating system" might seem a bit unnecessary here, but I wanted to a place to mention: I hate Windows.

### Browser

For developing and for general browsing, I use Safari. WebKit my beloved.

Occasionally, I'll fire up a guest Chrome profile to test Chromium. Though usually, if something works in Safari, it works in Chrome. What stuff doesn't always work in, however, is Firefox. I rarely test Gecko, but when I do it's with Mullvad Browser lol

### Editor

I reluctantly use Visual Studio Code.

I would very much like to use [Zed](https://zed.dev) — I used to daily drive it — but its support for [Supermaven](https://supermaven.com) is poor.

At this point, I'm reliant on Supermaven as an AI coding assistant — it's *really* good. I was skeptical to initially try it because I felt like GitHub Copilot was fine, but that's really all it is — fine. Supermaven is practically zero-latency compared to GitHub Copilot.

## Microblog

My microblog is the current staple of my site. It revolves around the service [Micro.blog](https://micro.blog), leveraging it as a backend.

The way Micro.blog works is the service takes your posts from their MySQL database and serves them as a static Hugo blog. Users can't simply query the database, so I've had to hack together a custom "API" to fetch my posts within Next.js: I created a [custom Hugo theme](https://github.com/in-the-trees/micro.blog-api) that, instead of generating static HTML pages, generates static JSON that I can fetch. I call it a pseudo-API.

I've strongly considered using Bluesky as the backend for my microblog, even creating an almost completely working partiy [branch](https://github.com/in-the-trees/next-jade/tree/bluesky) implementing it. Ultimately, I decided to stick with Micro.blog: while Bluesky's actual API was nice to work with, there are things about Micro.blog that I like, such as markdown and the indie-web vibe. And while my pseudo-API is the definition of hacky, it works!

## Inspirations

I've drawn inspiration for this site from a few sources:
- [nat.org](https://nat.org) for the homepage layout
- [sfcompute.com](https://sfcompute.com) for the [original styling](https://web.archive.org/web/20240602191402/https://inthetrees.me/)
- [jimramsden.com](https://jimramsden.com) for the faded-until-hover effect for an aside

This list is not exhaustive; I'll be adding to it as I recall more inspirations.