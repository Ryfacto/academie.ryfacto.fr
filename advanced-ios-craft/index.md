---
layout: landing
title: Advanced iOS Craft
id: advanced-ios-craft-landing
---

Dans cette série, je t'apprends __tout ce que je sais__ pour __créer une architecture émergente en Swift__.

Je te parle des __valeurs fondatrices__ qui guident ma manière de concevoir mon code.

Tu apprendras à créer un code 100% testable, __même la logique de navigation !__

Ne passe pas à côté en __t'inscrivant à la newsletter !__

{%- include newsletter_signup.html -%}

<hr />

{%- if site.advanced-ios-craft.size > 0 -%}
  <ul class="post-list">
    {%- assign posts = site.advanced-ios-craft | where:"beta","false" -%}
    {%- for post in posts -%}
    <li>
      <span class="post-meta">{{ post.date | date: "%d/%m/%Y" }}</span>
      <h3>
        <a class="post-link" href="{{ post.url | relative_url }}">
          {{ post.title | escape }}
        </a>
      </h3>
      {{ post.description }}
    </li>
    {%- endfor -%}
  </ul>
{%- endif -%}
